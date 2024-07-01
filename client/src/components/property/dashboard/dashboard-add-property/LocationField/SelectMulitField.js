"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {useSelector, useDispatch} from "react-redux"
import { addCommunityFieldValue } from "@/redux/communitySlice";


const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};





const SelectMultiField = () => {
  const {state, city, area} = useSelector((state)=> state.community)
  const dispatch = useDispatch()

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);

  const cityHanlder = (currentState) => {
    dispatch(addCommunityFieldValue({
      city: "",
      area: ""
    }))
    const cityOptionValues = currentState.value.city
    setAreaOptions([])
    setCityOptions(cityOptionValues);
  }


  const areaHandler = (currentCity) => {
    dispatch(addCommunityFieldValue({
      area: ""
    }))
    const areaOptionValues = currentCity.value.area
    setAreaOptions(areaOptionValues);
  }


  const fetchStateData = async () => {
    try {
      const res = await fetch('http://localhost:5000/state/getall');
      const stateData = await res.json();
      setStateOptions(stateData.data);
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=> {
    fetchStateData();
  }, [])


  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            State
          </label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={stateOptions?.map((item) => ({
                value: item,
                label: item.name,
              }))}
              onChange={(e)=> {
                cityHanlder(e);
                dispatch(addCommunityFieldValue({state: e.value._id}))
              }}
              defaultValue={state}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            City
          </label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={cityOptions?.map((item) => ({
                value: item,
                label: item.name,
              }))}
              onChange={(e)=> {
                areaHandler(e)
                dispatch(addCommunityFieldValue({city: e.value._id}))
              }}
              defaultValue={city}
              placeholder="please select"
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Neighborhood
          </label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={areaOptions?.map((item) => ({
                value: item,
                label: item.name,
              }))}
              onChange={(e)=> dispatch(addCommunityFieldValue({area: e.value._id}))}
              defaultValue={area}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
