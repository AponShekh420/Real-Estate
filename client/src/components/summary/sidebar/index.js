'use client'

import React, { useEffect } from "react";
import LocationList from "./LocationList";
import { useSelector } from "react-redux";

const ListingSidebar = () => {
  const { state, area, city } = useSelector(state => state.communityFilter);

  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">Find By {area ? "City" : state ? "Area" : "State"}</h6>
        <div className="radio-element">
          <LocationList />
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
