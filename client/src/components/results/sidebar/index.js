'use client'

import React, { useEffect } from "react";
// import LocationList from "./LocationList";
// import { useSelector } from "react-redux";
import FilterMenu from "./FilterMenu";

const ListingSidebar = () => {
  // const { state, area, city } = useSelector(state => state.communityFilter);

  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">
          {/* Find By {area ? "City" : state ? "Area" : "State"} */}
          Filters
        </h6>
        <div className="radio-element">
          {/* <LocationList /> */}
          <FilterMenu/>
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
