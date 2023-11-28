import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";

const mapToken = process.env.NEXT_PUBLIC_MAPTOKEN!;

import { type Meetup } from "~/utils/types";

const MeetupDetailMap: React.FC<Meetup> = (selectedMeetup) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: selectedMeetup.coordinates as [number, number],
      zoom: 14,
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker()
      .setLngLat(selectedMeetup.coordinates as [number, number])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h5>${selectedMeetup.title}</h5><p>${selectedMeetup.location}</p>`,
        ),
      )
      .addTo(map);
  }, [selectedMeetup]);

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ height: "400px", width: "100%" }}
    />
  );
};

export default MeetupDetailMap;
