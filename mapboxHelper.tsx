//// TODO:
//// Location store = meetupsGeoJSON(two arrays)[index].geometry.coordinates[num, num]
////
////

// function mouseClick(e: {
//   point:
//     | mapboxgl.PointLike
//     | [mapboxgl.PointLike, mapboxgl.PointLike]
//     | undefined;
//   lngLat: any;
// }) {
//   if (!mapRef.current) return;

//   const features = mapRef.current.queryRenderedFeatures(e.point, {
//     layers: ["clusters"],
//   });

//   spiderifier.unspiderfy();

//   if (features.length ?? !mapRef.current) {
//     return;
//   } else if (mapRef.current.getZoom() < SPIDERFY_FROM_ZOOM) {
//     mapRef.current.easeTo({
//       center: e.lngLat,
//       zoom: mapRef.current.getZoom() + 2,
//     });
//   } else {
//     if (features && features.length > 0 && features[0]?.properties) {
//       const clusterId = features[0].properties.cluster_id;

//       if (clusterId !== undefined && clusterId !== null) {
//         const source = mapRef.current.getSource("meetups");
//         if (
//           source instanceof mapboxgl.GeoJSONSource &&
//           "getClusterLeaves" in source
//         ) {
//           source.getClusterLeaves(
//             clusterId,
//             100,
//             0,
//             (err, leafFeatures) => {
//               if (err) {
//                 return console.error(
//                   "error while getting leaves of a cluster",
//                   err,
//                 );
//               }

//               if (leafFeatures) {
//                 const markers = leafFeatures.map((leafFeature) => {
//                   return leafFeature.properties;
//                 });
//                 if (features[0]?.geometry.type === "Point") {
//                   const coordinates =
//                     features[0].geometry.coordinates;
//                   if (coordinates.length >= 2) {
//                     const latLng: [number, number] = [
//                       coordinates[0]!,
//                       coordinates[1]!,
//                     ];
//                     spiderifier.spiderfy(latLng, markers);
//                   }
//                 }
//               }
//             },
//           );
//         }
//       }
//     }
//   }
// }

// if (!mapRef.current) return;
// mapRef.current.on("click", "clusters", (e: { point: any }) => {
//   if (!mapRef.current) return;
//   const features = mapRef.current.queryRenderedFeatures(e.point, {
//     layers: ["clusters"],
//   });

//   if (!features[0] || !features[0].properties) {
//     return;
//   }

//   const clusterId = features[0].properties.cluster_id;

//   const source = mapRef.current.getSource("meetups");

//   if (source && source.type === "geojson") {
//     const geoJSONSource = source;
//     geoJSONSource.getClusterExpansionZoom(
//       clusterId,
//       (err: any, zoom: any) => {
//         if (err) return;
//         if (features[0] == undefined) return;
//         if (features[0].geometry.type === "Point") {
//           const coordinates = features[0].geometry.coordinates;
//           if (Array.isArray(coordinates) && coordinates.length === 2) {
//             if (!mapRef.current) return;

//             mapRef.current.easeTo({
//               center: coordinates as [number, number],
//               zoom: zoom,
//             });
//           }
//         }
//       },
//     );
//   }
// });

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
