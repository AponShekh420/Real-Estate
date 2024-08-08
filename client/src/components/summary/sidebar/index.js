'use client'

import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import LocationList from "./LocationList";

const ListingSidebar = ({filterFunctions}) => {
  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">Find your home</h6>
        <SearchBox filterFunctions={filterFunctions} />
      </div>
      {/* End .widget-wrapper */}


      <div className="widget-wrapper">
        <h6 className="list-title">Find By Location</h6>
        <div className="radio-element">
          <LocationList />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Community Type</h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div>
      

      <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button className="ud-btn btn-thm">
            <span className="flaticon-search align-text-top pr10" />
            Search
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div onClick={()=>filterFunctions.resetFilter()} className="reset-button cursor" href="#">
          <span className="flaticon-turn-back" />
          <u>Reset all filters</u>
        </div>
        {/* <a className="reset-button" href="#">
          <span className="flaticon-favourite" />
          <u>Save Search</u>
        </a> */}
      </div>
    </div>
  );
};

export default ListingSidebar;
