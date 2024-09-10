'use client'
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PropertyType = () => {
  const {homeTypes} = useSelector(state => state.communityFilter);
  const dispatch = useDispatch();
  const [currentHomeTypes, setCurrentHomeTypes] = useState([...homeTypes]);

  const options = [
    { label: "Family" },
    { label: "Single", defaultChecked: true },
    { label: "Condos" },
    { label: "Villa" },
   
  ];

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setCurrentHomeTypes([])
    } else {
      setCurrentHomeTypes(currentHomeTypes.includes(elm) ? [...currentHomeTypes.filter((el) => el != elm)] : [...currentHomeTypes, elm],)
    }
  };

  const typeHandler = () => {
    dispatch(addCommunityFilterValue({
      homeTypes: currentHomeTypes,
    }));
  }

  return (
    <>
      <button
        type="button"
        className="open-btn mb15 dropdown-toggle"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
      >
        Community Type <i className="fa fa-angle-down ms-2" />
      </button>
      <div className="dropdown-menu">
        <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
          <h6 className="list-title">Property Type</h6>
          <div className="checkbox-style1">
            <label className="custom_checkbox"  >
              All
              <input type="checkbox"
                checked={currentHomeTypes.length < 1}
                onChange={(e)=> setCurrentHomeTypes([])}
              />
              <span className="checkmark" />
            </label>
            {options.map((option, index) => (
              <label className="custom_checkbox" key={index} >
                {option.label}
                <input type="checkbox"
                checked={currentHomeTypes.includes(option.label)}
                onChange={(e=>{handlepropertyTypes(option.label)})}
              />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        </div>
        <div className="text-end mt10 pr10">
          <button
            type="button"
            className="done-btn ud-btn btn-thm dropdown-toggle"
            onClick={typeHandler}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyType;
