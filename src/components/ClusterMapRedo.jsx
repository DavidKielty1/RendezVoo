// // @ts-nocheck
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import { env } from "../env";
// import { useEffect, useRef } from "react";
// import { api } from "../utils/api";
// import router from "../utils/api"
// import * as MapboxglSpiderifier from "mapboxgl-spiderifier";

// import mapboxgl from "mapbox-gl";
// import _ from "lodash";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import "mapbox-gl/dist/mapbox-gl.css";

// const mapToken = env.NEXT_PUBLIC_MAPTOKEN;
// mapboxgl.accessToken = mapToken;

// var iconTypes = ['car', 'bicycle', 'bus', 'cab', 'truck', 'train', 'rocket', 'ship'];
// var iconColors = ['red', 'blue', 'green', 'orange', '#ab1234', '#112312'];
// var randomMarker = function(index){
//   return {
//     id: index,
//     type: _.sample(iconTypes),
//     color: _.sample(iconColors)
//   }
// };
// export default function ClusterMapRedo() {
//   const { data: meetups } =
//     api.meetup.getAllMeetups.useQuery(undefined);

//     const meetupsCountByCoordinates = {};

//     meetups.forEach(meetup => {
//       const key = meetup.coordinates.join(','); // Create a unique key from coordinates
//       meetupsCountByCoordinates[key] = (meetupsCountByCoordinates[key] || 0) + 1;
//     });

//   const mapContainerRef = useRef(null);
//   const mapRef = useRef();

//   useEffect(() => {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/light-v11",
//         center: [-4.1317, 50.8525],
//         zoom: 4,
//       });
//       var spiderifier = new MapboxglSpiderifier(mapRef.current, {
//         animate: true,
//         animationSpeed: 200,
//         customPin: true,
//         onClick: function(e, spiderLeg){
//           console.log(spiderLeg);
//         },
//         initializeLeg: initializeSpiderLeg
//       });

//       function initializeSpiderLeg(spiderLeg){
//         var pinElem = spiderLeg.elements.pin;
//         var feature = spiderLeg.feature;
//         var popup;
//         pinElem.className = pinElem.className + ' fa-stack fa-lg';

//         pinElem.innerHTML = `${feature.title}`
//         pinElem.style.color = feature.color;

//         pinElem.addEventListener('mouseenter', function() {
//             popup = new mapboxgl.Popup({
//               closeButton: false,
//               closeOnClick: true,
//               offset: MapboxglSpiderifier.popupOffsetForSpiderLeg(spiderLeg)
//             });

//             popup.setHTML(`<a href='/${feature.id}'
//             class='map-popup-link text-6xl'
//             style="color: #1d4ed8; font-size: 14px; font-family: raleway; text-decoration: none; font-weight:bold;"
//             data-id='${feature.id}'
//           >${feature.title}</a>`,)
//               .addTo(mapRef.current)

//             spiderLeg.mapboxMarker.setPopup(popup);
//           })
//           pinElem.addEventListener('mouseleave', function() {
//             if(popup){
//               popup.remove();
//             }
//           });
//       }
//       mapRef.current.on("load", () => {
//         const meetupsGeoJSON = {
//           type: "FeatureCollection",
//           features: meetups.map(meetup => {
//             const key = meetup.coordinates.join(',');
//             return {
//               type: "Feature",
//               geometry: {
//                 type: "Point",
//                 coordinates: meetup.coordinates
//               },
//               properties: {
//                 popUpMarkup: `<a href='/${meetup.id}'
//                 class='map-popup-link text-6xl'
//                 style="color: #1d4ed8; font-size: 14px; font-family: raleway; text-decoration: none; font-weight:bold;"
//                 data-id='${meetup.id}'
//                 >${meetup.title}</a>`,
//                 ...meetup, // Spread other properties of the meetup
//                 count: meetupsCountByCoordinates[key] // Add count property
//               }
//             };
//           })
//         };

//           mapRef.current.addSource("meetups", {
//             type: "geojson",
//             data: meetupsGeoJSON,
//           });

//           mapRef.current.addLayer({
//             'id': 'meetups',
//             'type': 'circle',
//             'source': 'meetups',
//             layout: {
//               "icon-image": "marker-15",
//             },
//             'paint': {
//               'circle-radius': 30,
//               'circle-color': '#288DC1',
//               'circle-opacity': 0.8
//             },
//           });
//           mapRef.current.on('mousemove', mouseMove);
//           mapRef.current.on('click', mouseClick);
//       });
//       function mouseClick(e) {
//         var clickedOnFeatures = mapRef.current.queryRenderedFeatures(e.point, {
//           layers: ['meetups']
//         });
//         if (!clickedOnFeatures.length) {
//           spiderifier.unspiderfy();
//           console.log("No features found or unspiderfying"); // Log if no features are found
//           return;
//         }
//         var clickedOnFeature = clickedOnFeatures[0];
//         console.log("Clicked on Feature: ", clickedOnFeature); // Log the clicked feature

//         if (!clickedOnFeature.properties?.count) {
//           console.error("Count property missing in feature");
//           return;
//         }

//         let count = clickedOnFeature.properties.count;
//         var features = _.map(_.range(count), randomMarker);
//         console.log("Generated Features for Spiderfy: ", features); // Log generated features

//         spiderifier.spiderfy(clickedOnFeature.geometry.coordinates, features);
//       }
//       function mouseMove(e) {
//         var features = mapRef.current.queryRenderedFeatures(e.point, {
//           layers: ['meetups']
//         });
//         mapRef.current.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
//       }

//       const resizeMap = () => {
//         mapRef.current?.resize();
//       };
//       const resizeTimeout = setTimeout(resizeMap, 200);
//       window.addEventListener("resize", resizeMap);
//       return () => {
//         clearTimeout(resizeTimeout);
//         window.removeEventListener("resize", resizeMap);
//         if (mapRef.current) {
        
//           mapRef.current.remove();
//           mapRef.current = undefined;
//         }
//       };
//   }, []);
//   return (
//     <div
//       className="h-[500px] w-full"
//       ref={mapContainerRef}
//       id="cluster-map"
//     ></div>
//   );
// }
