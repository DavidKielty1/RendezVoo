/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useRef } from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { env } from "../env.js";
import { type Meetup } from "~/utils/types";
import router from "next/router";
import MapboxglSpiderifier from "mapboxgl-spiderifier";
import _ from "lodash";

const mapToken = env.NEXT_PUBLIC_MAPTOKEN;
mapboxgl.accessToken = mapToken;

type Props = {
  allMeetupsFiltered: Meetup[];
};

export default function ClusterMap({ allMeetupsFiltered }: Props) {
  const meetups = allMeetupsFiltered;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const clusterMarkers: mapboxgl.Marker[] = [];
  let spiderifier: any;
  let SPIDERFY_FROM_ZOOM: number;
  const mapCenter: [number, number] = [0, 0];
  let features;

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      (mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-4.1317, 50.8525],
        zoom: 4,
      })),
        (spiderifier = new MapboxglSpiderifier(mapRef.current, {
          customPin: true,
        })),
        (SPIDERFY_FROM_ZOOM = 7),
        (features = _.map(_.range(10000), function (index: any) {
          return {
            type: "feature",
            properties: { id: index },
            geometry: {
              type: "Point",
              coordinates: [
                mapCenter[0] + _.random(1000) * 0.001,
                mapCenter[1] + _.random(1000) * 0.001,
              ],
            },
          };
        })),
        mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on("load", () => {
        const meetupsGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
          type: "FeatureCollection",
          features:
            meetups?.map((meetup: Meetup) => ({
              type: "Feature",
              geometry: {
                coordinates: meetup.coordinates as [number, number],
                type: "Point",
              },
              properties: {
                popUpMarkup: `<a href='/${meetup.id}'
                class='map-popup-link text-6xl'
                style="color: #1d4ed8; font-size: 14px; font-family: raleway; text-decoration: none; font-weight:bold;"
                data-id='${meetup.id}'
              >${meetup.title}</a>`,
              },
            })) ?? [],
        };
        if (mapRef.current && meetups && meetups.length > 0) {
          mapRef.current.addSource("meetups", {
            type: "geojson",
            data: meetupsGeoJSON,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });
          mapRef.current.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "meetups",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#93c5fd",
              "circle-radius": 5,
              "circle-stroke-width": 0.5,
              "circle-stroke-color": "#020617",
            },
          });
          mapRef.current.addLayer({
            id: "markers",
            type: "symbol",
            source: "meetups",
            layout: {
              "icon-image": "marker-15",
            },
            filter: ["all", ["!has", "point_count"]],
          });
          mapRef.current.addLayer({
            id: "clusters",
            type: "circle",
            source: "meetups",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#f9a8d4",
                5,
                "#67e8f9",
                15,
                "#fde68a",
                35,
                "#818cf8",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                8,
                2,
                15,
                5,
                25,
                15,
                35,
                35,
                45,
              ],
              "circle-stroke-width": 0.5,
              "circle-stroke-color": "#9ca3af",
            },
          });
          mapRef.current.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "meetups",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          mapRef.current.on("click", "clusters", clusterClick);
          mapRef.current.on(
            "click",
            "unclustered-point",
            (
              e: mapboxgl.MapMouseEvent & {
                features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
              } & mapboxgl.EventData,
            ) => {
              const features = e.features;
              if (!features || features.length === 0) return;

              const firstFeature = features[0];
              if (firstFeature == undefined) return;
              const geometry = firstFeature.geometry;

              if (geometry.type === "Point" && "coordinates" in geometry) {
                const coordinates = geometry.coordinates;

                const popUpMarkup = firstFeature?.properties?.popUpMarkup;
                if (!mapRef.current || !popUpMarkup || !clusterMarkers) return;

                new mapboxgl.Popup()
                  .setLngLat(coordinates as [number, number])
                  .setHTML(popUpMarkup)
                  .addTo(mapRef.current)
                  .on("open", () => {
                    const links = document.querySelectorAll(".map-popup-link");
                    links.forEach((link) => {
                      link.addEventListener("click", (event) => {
                        event.preventDefault();
                        const meetupId = link.getAttribute("data-id");
                        void router.push(`/path/${meetupId}`);
                      });
                    });
                  });
              }
            },
          );
          let dragendTimeoutId: NodeJS.Timeout;
          mapRef.current.on("dragend", () => {
            if (!mapRef.current) return;
            if (dragendTimeoutId) clearTimeout(dragendTimeoutId);
            dragendTimeoutId = setTimeout(() => {
              if (!isClusterMarkerClicked) {
                clusterMarkers.forEach((marker) => marker.remove());
                clusterMarkers.length = 0;
              }
            }, 10000);
          });

          mapRef.current.on("mouseenter", "clusters", () => {
            if (!mapRef.current) return;
            mapRef.current.getCanvas().style.cursor = "pointer";
          });
          mapRef.current.on("mouseleave", "clusters", () => {
            if (!mapRef.current) return;
            mapRef.current.getCanvas().style.cursor = "";
          });
          if (!mapRef.current) return;
          mapRef.current.on("mousemove", mouseMove);
          mapRef.current.on("zoomstart", function () {
            if (!mapRef.current) return;
            spiderifier.unspiderfy();
            setZoomInfoText();
          });

          setZoomInfoText();
          function setZoomInfoText() {
            if (!mapRef.current) return;
            const zoomValueElement = document.getElementById("zoomvalue");
            const zoomBehaviorElement = document.getElementById("zoombehavior");
            if (zoomValueElement) {
              zoomValueElement.innerHTML = mapRef.current.getZoom().toString();
            }
            if (zoomBehaviorElement) {
              zoomBehaviorElement.innerHTML =
                mapRef.current.getZoom() < SPIDERFY_FROM_ZOOM
                  ? "zoom"
                  : "spiderfy";
            }
          }
          function mouseMove(e: {
            point:
              | mapboxgl.PointLike
              | [mapboxgl.PointLike, mapboxgl.PointLike]
              | undefined;
          }) {
            if (!mapRef.current) return;

            const features = mapRef.current.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });
            mapRef.current.getCanvas().style.cursor = features.length
              ? "pointer"
              : "";
          }
        }

        function calculateClusterCenter(coordinates: [number, number][]) {
          if (coordinates.length === 0) {
            return [0, 0]; // Default to [0, 0] if there are no coordinates
          }
          const totalLat = coordinates.reduce(
            (sum, coord) => sum + coord[1],
            0,
          );
          const totalLng = coordinates.reduce(
            (sum, coord) => sum + coord[0],
            0,
          );
          const avgLat = totalLat / coordinates.length;
          const avgLng = totalLng / coordinates.length;
          return [avgLng, avgLat] as [number, number];
        }

        let isClusterMarkerClicked = false;
        function clusterClick(e: any) {
          if (mapRef.current) {
            const currentZoom = mapRef.current.getZoom();
            if (currentZoom < 9) {
              const newZoom = Math.min(
                currentZoom + 4,
                mapRef.current.getMaxZoom(),
              );
              mapRef.current.flyTo({ center: e.lngLat, zoom: newZoom });
            }

            isClusterMarkerClicked = true;

            if (!mapRef.current) {
              return;
            }

            const features = mapRef.current.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });

            if (features.length > 0) {
              const clusterId = features[0]?.properties?.cluster_id;
              const source = mapRef.current.getSource(
                "meetups",
              ) as mapboxgl.GeoJSONSource;

              if (
                clusterId !== undefined &&
                source &&
                typeof source.getClusterLeaves === "function"
              ) {
                source?.getClusterExpansionZoom(clusterId, (err: any) => {
                  if (err) return;

                  source?.getClusterLeaves(
                    clusterId,
                    100,
                    0,
                    (err: any, leaves: any[]) => {
                      if (err) return;

                      const clusterCoordinates = calculateClusterCenter(
                        leaves.map((leaf) => leaf.geometry.coordinates),
                      );

                      clusterMarkers.forEach((marker) => {
                        marker.remove();
                      });
                      clusterMarkers.length = 0;

                      const markers = leaves
                        .map(
                          (leaf: {
                            geometry: { type: string; coordinates: any };
                            properties: any;
                          }) => {
                            const leafCoords =
                              leaf.geometry.type === "Point"
                                ? leaf.geometry.coordinates
                                : null;
                            return {
                              coordinates: leafCoords,
                              properties: leaf.properties,
                            };
                          },
                        )
                        .filter((leaf: any) => leaf.coordinates);

                      if (markers.length > 0) {
                        const radius = 0.01;
                        const angleStep = (2 * Math.PI) / markers.length;

                        for (let i = 0; i < markers.length; i++) {
                          const angle = i * angleStep;
                          const x = radius * Math.cos(angle);
                          const y = radius * Math.sin(angle);

                          if (!clusterCoordinates[0] || !clusterCoordinates[1])
                            return;
                          const markerCoordinates: LngLatLike = [
                            clusterCoordinates[0] + x,
                            clusterCoordinates[1] + y,
                          ];
                          const popupContent =
                            markers[i]?.properties?.popUpMarkup ?? "No Content";
                          if (!mapRef.current) {
                            return;
                          }
                          const newMarker: mapboxgl.Marker =
                            new mapboxgl.Marker()
                              .setLngLat(markerCoordinates)
                              .setPopup(
                                new mapboxgl.Popup().setHTML(popupContent),
                              )
                              .addTo(mapRef.current);
                          clusterMarkers.push(newMarker);
                        }
                      }
                    },
                  );
                });
              }
            }
            setTimeout(() => {
              isClusterMarkerClicked = false;
            }, 10);
          }
        }
      });
      const resizeMap = () => {
        mapRef.current?.resize();
      };
      const resizeTimeout = setTimeout(resizeMap, 10);
      window.addEventListener("resize", resizeMap);
      return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener("resize", resizeMap);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = undefined;
        }
      };
    }
  }, [mapRef.current]);
  return (
    <div
      className="h-[500px] w-full"
      ref={mapContainerRef}
      id="cluster-map"
    ></div>
  );
}
