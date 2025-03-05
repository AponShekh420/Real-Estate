"use client";
import { useSelector } from "react-redux";

const Map = () => {
  const { map, address, stateId, zip } = useSelector(
    (state) => state.community
  );
  const newAddress = `${stateId ? stateId?.name : ""} ${
    address ? address : ""
  } ${map ? map : ""} ${zip ? zip : ""}`;
  // Use the user-specified location if available; otherwise, default to USA without a specific marker.
  const locationSrc = newAddress
    ? `https://maps.google.com/maps?q=${newAddress}&t=m&z=14&output=embed&iwloc=near`
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
