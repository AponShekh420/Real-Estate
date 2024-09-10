'use client'

import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import store from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListingStatus = () => {
  // redux
  const dispatch = useDispatch();
  const {status} = useSelector(state =>  state.communityFilter)

  // react state
  const [currentStatus, setCurrentStatus] = useState(status || "")
  
  const handlelistingStatus = (elm) => {
    setCurrentStatus(elm)
  };

  const statusHanlder = () => {
    dispatch(addCommunityFilterValue({
      status: currentStatus,
    }));
  }



  const options = [
    { id: "flexRadioDefault4", label: "" , defaultChecked: true },
    { id: "flexRadioDefault1", label: "Buy" },
    { id: "flexRadioDefault2", label: "Rent", },
    { id: "flexRadioDefault3", label: "Sold", },
  ];



  return (
    <>
      <button
        type="button"
        className="open-btn mb15 dropdown-toggle"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
      >
        For {status == "" ? "All" : status} <i className="fa fa-angle-down ms-2" />
      </button>
      <div className="dropdown-menu">
        <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
          <h6 className="list-title">Community Status</h6>
          <div className="radio-element">
          {options.map((option) => (
              <div
                className="form-check d-flex align-items-center mb10"
                key={option.id}
              
              >
                <input
                  className="form-check-input"
                  type="radio"
                  checked={currentStatus == option.label}
                  onChange={()=>handlelistingStatus(option.label)}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  {option.label == "" ? "All" : option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="text-end mt10 pr10">
          <button type="button" className="done-btn ud-btn btn-thm drop_btn dropdown-toggle" onClick={statusHanlder}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default ListingStatus;
