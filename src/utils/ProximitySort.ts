function haversineDistance(coords1: number[], coords2: number[]) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2[0]! - coords1[0]!);
  const dLon = toRad(coords2[1]! - coords1[1]!);

  const lat1 = toRad(coords1[0]!);
  const lat2 = toRad(coords2[0]!);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInKm = R * c;
  const kmToMiles = 0.621371;
  return distanceInKm * kmToMiles; // Distance in miles
}

type SimpleMeetup = {
  name: string;
  coordinates: number[];
};

function sortMeetupsByDistanceDescending(
  meetups: SimpleMeetup[],
  userCoordinates: number[],
) {
  return meetups.sort((a, b) => {
    const distanceA = haversineDistance(userCoordinates, a.coordinates);
    const distanceB = haversineDistance(userCoordinates, b.coordinates);
    return distanceB - distanceA; // Changed to sort from furthest to closest
  });
}

const userCoordinates = [116.3912757, 39.906217];
const meetups = [
  { name: "Meetup1", coordinates: [23.728305, 37.983941] }, // Athens, Greece
  { name: "Meetup2", coordinates: [40.712776, -74.005974] }, // New York, USA
  { name: "Meetup3", coordinates: [51.507351, -0.127758] }, // London, UK
  { name: "Meetup4", coordinates: [35.689487, 139.691711] }, // Tokyo, Japan
  { name: "Meetup5", coordinates: [-33.86882, 151.20929] }, // Sydney, Australia
  { name: "Meetup6", coordinates: [48.856613, 2.352222] }, // Paris, France
];

const sortedMeetupsDescending = sortMeetupsByDistanceDescending(
  meetups,
  userCoordinates,
);

console.log(sortedMeetupsDescending);
