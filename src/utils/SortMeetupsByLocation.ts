/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React, { useState } from "react";
import { type Meetup } from "~/utils/types";
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding.js") as any;

const MapboxToken = process.env.NEXT_PUBLIC_MAPTOKEN;
const geocoder = mbxGeocoding({ accessToken: MapboxToken });

async function sortMeetupsByLocation(
  locationInput: string,
  meetups: Meetup[],
  callback: (sortedMeetups: Meetup[]) => void,
) {
  if (!locationInput) return;

  try {
    const response = await geocoder
      .forwardGeocode({
        query: locationInput,
        limit: 1,
      })
      .send();

    const geoData = response.body.features[0].geometry.coordinates;

    const sortedMeetupsArray = meetups.slice().sort((a, b) => {
      const distA = haversineDistance(
        geoData,
        a.coordinates as [number, number],
      );
      const distB = haversineDistance(
        geoData,
        b.coordinates as [number, number],
      );
      return distA - distB;
    });

    callback(sortedMeetupsArray);
  } catch (error) {
    console.error("Error fetching geodata:", error);
  }

  function haversineDistance(
    coords1: [number, number],
    coords2: [number, number],
  ) {
    function toRad(x: number): number {
      return (x * Math.PI) / 180;
    }

    const lon1 = coords1[0];
    const lat1 = coords1[1];

    const lon2 = coords2[0];
    const lat2 = coords2[1];

    const R = 3959; // Earth's radius in miles

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }
}

export default sortMeetupsByLocation;
