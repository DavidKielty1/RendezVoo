/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React, { useState } from "react";
import { api } from "~/utils/api";
import { type Meetup } from "~/utils/types";

export default function SortMeetups() {
  const { data: meetups } = api.meetup.getAllMeetups.useQuery<Meetup[]>();

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

  const userCoordinates: [number, number] = [39.906217, 116.3912757];

  meetups?.sort((a, b) => {
    const distA = haversineDistance(
      userCoordinates,
      a.coordinates as [number, number],
    );
    const distB = haversineDistance(
      userCoordinates,
      b.coordinates as [number, number],
    );
    return distA - distB;
  });

  console.log(meetups);

  return <div>SortMeetups</div>;
}
