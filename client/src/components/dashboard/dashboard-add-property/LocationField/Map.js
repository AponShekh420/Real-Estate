"use client"
import React from "react";
import { useSelector } from "react-redux";

const Map = () => {
  const {address} = useSelector(state => state.community)
  return (
    <iframe
      className="h550"
      loading="lazy"
      src={`https://maps.google.com/maps?q=${address}&t=m&z=14&output=embed&iwloc=near`}
      title={address}
      aria-label={address}
    />
  );
};

export default Map;
