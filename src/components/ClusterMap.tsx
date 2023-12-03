/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { env } from "../env.js";
import { useEffect, useRef } from "react";
import { api } from "../utils/api";
import { type Meetup } from "~/utils/types";
import router from "next/router";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

const mapToken = env.NEXT_PUBLIC_MAPTOKEN;
mapboxgl.accessToken = mapToken;

export default function ClusterMap() {
  const { data: meetups } =
    api.meetup.getAllMeetups.useQuery<Meetup[]>(undefined);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-4.1317, 50.8525],
        zoom: 4,
      });

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
                popUpMarkup: `<a href='/${meetup.id}' class='map-popup-link' style="color: blue; text-decoration: underline;" data-id='${meetup.id}'>${meetup.title}</a>`,
              },
            })) ?? [],
        };

        //// TODO:
        //// Location store = meetupsGeoJSON(two arrays)[index].geometry.coordinates[num, num]
        ////
        ////
        if (mapRef.current && meetups && meetups.length > 0) {
          mapRef.current.addSource("meetups", {
            type: "geojson",
            data: meetupsGeoJSON,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });

          mapRef.current.addLayer({
            id: "clusters",
            type: "circle",
            source: "meetups",
            filter: ["has", "point_count"],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#f9a8d4",
                10,
                "#67e8f9",
                30,
                "#fde68a",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                10,
                23,
                30,
                31,
              ],
              "circle-stroke-width": 1,
              "circle-stroke-color": "#212121",
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

          mapRef.current.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "meetups",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#18FFFF",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#212121",
            },
          });
          mapRef.current.on("click", "clusters", (e: { point: any }) => {
            if (!mapRef.current) return;
            const features = mapRef.current.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });

            if (!features[0] || !features[0].properties) {
              return;
            }

            const clusterId = features[0].properties.cluster_id;

            const source = mapRef.current.getSource("meetups");

            if (source && source.type === "geojson") {
              const geoJSONSource = source;
              geoJSONSource.getClusterExpansionZoom(
                clusterId,
                (err: any, zoom: any) => {
                  if (err) return;
                  if (features[0] == undefined) return;
                  if (features[0].geometry.type === "Point") {
                    const coordinates = features[0].geometry.coordinates;
                    if (
                      Array.isArray(coordinates) &&
                      coordinates.length === 2
                    ) {
                      if (!mapRef.current) return;

                      mapRef.current.easeTo({
                        center: coordinates as [number, number],
                        zoom: zoom,
                      });
                    }
                  }
                },
              );
            }
          });

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
                if (!popUpMarkup) return;
                if (!mapRef.current) return;

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
                        // Use Next.js router to navigate
                        void router.push(`/path/${meetupId}`);
                      });
                    });
                  });
              }
            },
          );
          mapRef.current.on("mouseenter", "clusters", () => {
            if (!mapRef.current) return;
            mapRef.current.getCanvas().style.cursor = "pointer";
          });
          mapRef.current.on("mouseleave", "clusters", () => {
            if (!mapRef.current) return;

            mapRef.current.getCanvas().style.cursor = "";
          });
        } else {
          if (!mapRef.current) return;

          const source = mapRef.current.getSource("meetups");
          if (source && source.type === "geojson") {
            source.setData(meetupsGeoJSON);
          }
        }

        // -- GEOCODER CODE -- //
        // -- GEOCODER CODE -- //
        // -- GEOCODER CODE -- //

        // const geocoder = new MapboxGeocoder({
        //   accessToken: mapboxgl.accessToken,
        //   mapboxgl: mapboxgl,
        //   marker: true,
        //   bbox: [-77.210763, 38.803367, -76.853675, 39.052643], // Set the bounding box coordinates
        // });
        // geocoder.on("result", (event) => {
        //   const searchResult = event.result.geometry;
        //   const options = { units: "miles" };
        //   for (const meetup of meetupsGeoJSON.features) {
        //     if (meetup.properties) {
        //       meetup.properties.distance = turf.distance(
        //         searchResult,
        //         meetup.geometry,
        //         options,
        //       );
        //     }
        //   }
        //   console.log(
        //     "meetupsGeoJSON example geometry",
        //     meetupsGeoJSON.features,
        //   );
        //   meetupsGeoJSON.features.sort((a, b) => {
        //     if (a.properties?.distance > b.properties?.distance) {
        //       return 1;
        //     }
        //     if (a.properties?.distance < b.properties?.distance) {
        //       return -1;
        //     }
        //     return 0; // a must be equal to b
        //   });
        //   const listings = document.getElementById("listings");
        //   while (listings?.firstChild) {
        //     listings?.removeChild(listings?.firstChild);
        //   }
        // });

        // mapRef.current.addControl(geocoder, "top-left");

        // -- GEOCODER CODE -- //
        // -- GEOCODER CODE -- //
        // -- GEOCODER CODE -- //
      });
    }
    const resizeMap = () => {
      mapRef.current?.resize();
    };
    const resizeTimeout = setTimeout(resizeMap, 500);

    window.addEventListener("resize", resizeMap);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", resizeMap);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = undefined;
      }
    };
  }, [meetups]);

  return (
    <div
      className="h-[500px] w-full"
      ref={mapContainerRef}
      id="cluster-map"
    ></div>
  );
}
