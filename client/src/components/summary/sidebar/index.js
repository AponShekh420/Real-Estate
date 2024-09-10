'use client'

import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "../ListingStatus";
import PropertyType from "../PropertyType";
import LocationList from "./LocationList";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { removeCommunityFilterValues } from "@/redux/communityFilterSlice";

const ListingSidebar = ({filterFunctions}) => {

  // const resetHanlder = (e) => {
  //   e.preventDefault();
  //   store.dispatch(removeCommunityFilterValues())
  // }



  return (
    <div className="list-sidebar-style1">

      {/* <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button className="ud-btn btn-thm" onClick={resetHanlder}>
            <span className="flaticon-turn-back align-text-top pr10" />
            <u>Reset all filters</u>
          </button>
        </div>
      </div> */}


      {/* <div className="widget-wrapper">
        <h6 className="list-title">Find your home</h6>
        <SearchBox />
      </div> */}
      {/* End .widget-wrapper */}


      <div className="widget-wrapper">
        <h6 className="list-title">Find By Location</h6>
        <div className="radio-element">
          <LocationList />
        </div>
      </div>
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Community Type</h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div> */}
      
    </div>
  );
};

export default ListingSidebar;
