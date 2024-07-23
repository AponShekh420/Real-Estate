"use client";
import { addCityFields } from "@/redux/citySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";


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
  // options
  const [stateOptions, setStateOptions] = useState([]);

  const {errors, stateId, active} = useSelector((state)=> state.city);
  const dispatch = useDispatch();

  const statusOption = [
    { value: "Active", label: "Active" },
    { value: "Deactive", label: "Deactive" },
  ];


  const fetchStateData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/state/getall/anytype');
      const stateData = await res.json();
      setStateOptions(stateData.data);
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=> {
    fetchStateData();
  }, [])

  // useEffect(()=> {
  //   console.log(stateId._id, active, cityName, abbreviation, description)
  // }, [stateId])


  return (
    <>
      <div className="col-sm-12 col-xl-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Parent Catagory
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
                dispatch(addCityFields({stateId: e.value}))
              }}
              value={{value: stateId?.name, label: stateId?.name}}
            />
            {/* <p className="text-danger">{errors?.stateId?.msg}</p> */}
          </div>
          <p className="text-danger">{errors?.stateId?.msg}</p>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
