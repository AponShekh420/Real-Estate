'use client'

import React from "react";
import LocationList from "./LocationList";

const ListingSidebar = () => {

  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">Find By Location</h6>
        <div className="radio-element">
          <LocationList />
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
