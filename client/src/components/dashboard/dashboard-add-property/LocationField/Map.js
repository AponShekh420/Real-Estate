"use client"
import React from "react";
import { useSelector } from "react-redux";

const Map = () => {
  const {map} = useSelector(state => state.community);

  // Use the user-specified location if available; otherwise, default to USA without a specific marker.
  const locationSrc = map 
    ? `https://maps.google.com/maps?q=${map}&t=m&z=14&output=embed&iwloc=near`
    : `https://maps.google.com/maps?q=USA&t=m&z=4&output=embed&iwloc=near`; // Show whole US without a marker

  return (
    <iframe
      className="h550"
      loading="lazy"
      src={locationSrc}
      title={map || "United States"}
      aria-label={map || "United States"}
    />
  );
};

export default Map;
