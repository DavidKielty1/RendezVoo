function haversineDistance(coords1, coords2) {
    var toRad = function (x) { return (x * Math.PI) / 180; };
    var R = 6371; // Earth radius in km
    var dLat = toRad(coords2[0] - coords1[0]);
    var dLon = toRad(coords2[1] - coords1[1]);
    var lat1 = toRad(coords1[0]);
    var lat2 = toRad(coords2[0]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distanceInKm = R * c;
    var kmToMiles = 0.621371;
    return distanceInKm * kmToMiles; // Distance in miles
}
function sortMeetupsByDistanceDescending(meetups, userCoordinates) {
    return meetups.sort(function (a, b) {
        var distanceA = haversineDistance(userCoordinates, a.coordinates);
        var distanceB = haversineDistance(userCoordinates, b.coordinates);
        return distanceB - distanceA; // Changed to sort from furthest to closest
    });
}
var userCoordinates = [116.3912757, 39.906217];
var meetups = [
    { name: "Meetup1", coordinates: [23.728305, 37.983941] }, // Athens, Greece
    { name: "Meetup2", coordinates: [40.712776, -74.005974] }, // New York, USA
    { name: "Meetup3", coordinates: [51.507351, -0.127758] }, // London, UK
    { name: "Meetup4", coordinates: [35.689487, 139.691711] }, // Tokyo, Japan
    { name: "Meetup5", coordinates: [-33.86882, 151.20929] }, // Sydney, Australia
    { name: "Meetup6", coordinates: [48.856613, 2.352222] }, // Paris, France
];
var sortedMeetupsDescending = sortMeetupsByDistanceDescending(meetups, userCoordinates);
console.log(sortedMeetupsDescending);
