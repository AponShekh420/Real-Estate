"use client";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Select from "react-select"
import { addCityFields } from "@/redux/citySlice";

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
  const {errors, stateId, areaId, active} = useSelector((state)=> state.city)
  const dispatch = useDispatch()

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);


  const statusOption = [
    { value: "Active", label: "Active" },
    { value: "Deactive", label: "Deactive" },
  ];

  const areaHanlder = (currentState) => {
    dispatch(addCityFields({
      areaId: "",
    }))
    const areaOptionValues = currentState.value.area
    setAreaOptions(areaOptionValues);
  }

  const fetchStateData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/anytype`, {credentials: "include"});
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
      <div className="col-sm-12 col-xl-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            State
          </label>
          <div className="location-area">
            <Select
              id="sdfiouiaweu"
              instanceId="sdfiouiaweu"
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
                dispatch(addCityFields({stateId: e.value}))
              }}
              value={{value: stateId?.name, label: stateId?.name}}
            />
            <p className="text-danger">{errors?.stateId?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-xl-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Area
          </label>
          <div className="location-area">
            <Select
              instanceId="sduiwuernsdfjsd"
              id="sduiwuernsdfjsd"
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
                dispatch(addCityFields({areaId: e.value}))
              }}
              placeholder="please select"
              value={{value: areaId?.name, label: areaId?.name}}
            />
            <p className="text-danger">{errors?.areaId?.msg}</p>
          </div>
        </div>
      </div>

      <div className="col-sm-12 col-xl-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Status
          </label>
          <div className="location-area">
            <Select
              instanceId="iosufwen"
              id="iosufwen"
              defaultValue={[statusOption[0]]}
              name="colors"
              options={statusOption}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              onChange={(e)=> {
                dispatch(addCityFields({
                  active: e.value === "Deactive" ? false : true
                }))
              }}
              value={{value: active ? "Active" : "Deactive", label: active ? "Active" : "Deactive"}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;