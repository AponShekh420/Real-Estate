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
  const {errors, stateId, cityId, areaId} = useSelector((state)=> state.community)
  const dispatch = useDispatch()

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);

  const areaHanlder = (currentState) => {
    dispatch(addCommunityFieldValue({
      cityId: null,
      areaId: null
    }))
    const areaOptionValues = currentState.value.area.map(item => item.active && item).length > 0 ? currentState.value.area.map(item => item.active && item) : [];
    setCityOptions([])
    setAreaOptions(areaOptionValues[0] ? areaOptionValues : []);
  }


  const cityHandler = (currentArea) => {
    dispatch(addCommunityFieldValue({
      cityId: null
    }))
    const cityOptionValues = currentArea.value.city.map(item => item.active && item).length > 0 ? currentArea.value.city.map(item => item.active && item) : [];
    setCityOptions(cityOptionValues[0] ? cityOptionValues : []);
  }


  const fetchStateData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/state/getall/active');
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
                label: `${item.name} (${item.active ? "Active": "Deactive"})`,
              }))}
              onChange={(e)=> {
                areaHanlder(e);
                dispatch(addCommunityFieldValue({stateId: e.value}))
              }}
              value={{value: stateId?.name, label: stateId?.name}}
            />
            <p className="text-danger">{errors?.stateId?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Area
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
                label: `${item.name} (${item.active ? "Active": "Deactive"})`,
              }))}
              onChange={(e)=> {
                cityHandler(e)
                dispatch(addCommunityFieldValue({areaId: e.value}))
              }}
              placeholder="please select"
              value={{value: areaId?.name, label: areaId?.name}}
            />
            <p className="text-danger">{errors?.areaId?.msg}</p>
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
                label: `${item.name} (${item.active ? "Active": "Deactive"})`,
              }))}
              onChange={(e)=> dispatch(addCommunityFieldValue({cityId: e.value}))}
              value={{value: cityId?.name, label: cityId?.name}}
            />
            <p className="text-danger">{errors?.cityId?.msg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;