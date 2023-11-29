import { api } from "./api";
function haversineDistance(coords1, coords2) {
  const { data: meetups } = api.meetup.getAllMeetups.useQuery(undefined);

  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // Earth's radius in km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}

var userCoordinates = [39.906217, 116.3912757];

meetups.sort((a, b) => {
  let distA = haversineDistance(userCoordinates, a.coordinates);
  let distB = haversineDistance(userCoordinates, b.coordinates);
  return distA - distB;
});

console.log(meetups);
