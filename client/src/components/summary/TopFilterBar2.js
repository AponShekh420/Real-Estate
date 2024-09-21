'use client'

import React from "react";
import PropertyType from "./PropertyType";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import getCommunities from "@/lib/getCommunities";



let searchIntervel;
const TopFilterBar2 = ({filterFunctions} ) => {
  // redux action
  const dispatch = useDispatch();
  const {titleSearch}= useSelector(state => state.communityFilter)


  const searchHandler = (e) => {
    clearInterval(searchIntervel)
    dispatch(addCommunityFilterValue({
      titleSearch: e.target.value,
    }))

    searchIntervel = setTimeout(()=> {
      getCommunities()
    }, 1000)
  }



  return (
    <>
      <li className="list-inline-item position-relative">
        <input
          type="text"
          className="form-control search-field"
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          onChange={(e)=> searchHandler(e)}
          value={titleSearch}
        />
      </li>
      
      {/* End li Listing Status */}

      <li className="list-inline-item position-relative">
        <PropertyType/>
      </li>
      {/* End li Property Type */}

      <li className="list-inline-item">
        {/* Advance Features modal trigger */}
        <button
          type="button"
          className="open-btn mb15"
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" /> More Filter
        </button>
      </li>
    </>
  );
};

export default TopFilterBar2;
