/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { type Meetup } from "~/utils/types";
import { api } from "~/utils/api";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";

type Props = {
  locationInput: string;
  sortedMeetups: (meetups: Meetup[]) => void;
};

export default function SortMeetups({ locationInput, sortedMeetups }: Props) {
  const { data: meetups } = api.meetup.getAllMeetups.useQuery<Meetup[]>();
  const [geoData, setGeoData] = useState(null);

  const MapboxToken = process.env.NEXT_PUBLIC_MAPTOKEN;
  const geocoder = mbxGeocoding({ accessToken: MapboxToken });

  useEffect(() => {
    async function getCoordinatesFromLocationInput() {
      try {
        const response = await geocoder
          .forwardGeocode({
            query: locationInput,
            limit: 1,
          })
          .send();

        setGeoData(response.body.features[0].geometry.coordinates);
      } catch (error) {
        console.error("Error fetching geodata:", error);
      }
    }

    if (locationInput) {
      void getCoordinatesFromLocationInput();
    }
  }, [locationInput]);

  useEffect(() => {
    if (geoData && meetups) {
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
      sortedMeetups(sortedMeetupsArray);
    }
  }, [geoData, meetups]);

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

    const R = 6371; // Earth's radius in km

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
