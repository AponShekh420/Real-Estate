'use client'

import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import store from "@/redux/store";
import React, { useEffect, useState } from "react";

const ListingStatus = () => {
  // const [listingStatus, setListingStatus] = useState("");
  // const [propertyTypes, setPropertyTypes] = useState([]);

  const [reloadNotify, setReloadNotify] = useState("");


  const {dispatch} = store;
  const {status} = store.getState().communityFilter;

  const handlelistingStatus = (elm) => {
    dispatch(addCommunityFilterValue({
      status: elm,
    }));
    setReloadNotify(elm);
  };

  const options = [
    { id: "flexRadioDefault4", label: "" , defaultChecked: true },
    { id: "flexRadioDefault1", label: "Buy" },
    { id: "flexRadioDefault2", label: "Rent", },
    { id: "flexRadioDefault3", label: "Sold", },
  ];



  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
         
        >
          <input
            className="form-check-input"
            type="radio"
            checked={status == option.label}
            
            onChange={()=>handlelistingStatus(option.label)}
           
            
   
            
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label == "" ? "All" : option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
