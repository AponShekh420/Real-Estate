'use client'

import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import store from "@/redux/store";
import React, { useState } from "react";

const PropertyType = () => {
  const [reloadNotify, setReloadNotify] = useState("");


  const {dispatch} = store;
  const {homeTypes} = store.getState().communityFilter;

  const options = [

    { label: "Family" },
    { label: "Single", defaultChecked: true },
    { label: "Condos" },
    { label: "Villa" },
   
  ];

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      dispatch(addCommunityFilterValue({
        homeTypes: [],
      }));
    } else {
      dispatch(addCommunityFilterValue({
        homeTypes: homeTypes.includes(elm) ? [...homeTypes.filter((el) => el != elm)] : [...homeTypes, elm],
      }));
    }
    setReloadNotify(elm);
  };

  return (
    <>
    <label className="custom_checkbox"  >
          All
          <input type="checkbox"
          checked={homeTypes.length < 1}
          onChange={(e=>{
            dispatch(addCommunityFilterValue({
              homeTypes: [],
            }));
          })}
  />
          <span className="checkmark" />
        </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index} >
          {option.label}
          <input type="checkbox"
          checked={homeTypes.includes(option.label)}
          onChange={(e=>{handlepropertyTypes(option.label)})}
  />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
