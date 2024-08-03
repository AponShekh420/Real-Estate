"use client";
import { addCityFields } from "@/redux/citySlice";
import { addSubcatagoryFields } from "@/redux/subCatagorySlice";
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
  const [catagoryOptions, setCatagoryOptions] = useState([]);

  const {errors, catagoryId} = useSelector((state)=> state.subcatagory);
  const dispatch = useDispatch();


  const fetchCatagoryData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/catagory/getall');
      const catagoryData = await res.json();
      catagoryData.data.shift();
      setCatagoryOptions(catagoryData.data);
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=> {
    fetchCatagoryData();
  }, [])

  // useEffect(()=> {
  //   console.log(catagoryId._id, cityName, abbreviation, description)
  // }, [catagoryId])


  return (
    <>
      <div className="col-sm-12 col-xl-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Parent Catagory
          </label>
          <div className="location-area">
            <Select
              id="jasjfioaweiur"
              instanceId={"jasjfioaweiur"}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={catagoryOptions?.map((item) => ({
                value: item,
                label: `${item.name}`,
              }))}
              onChange={(e)=> {
                dispatch(addSubcatagoryFields({catagoryId: e.value}))
              }}
              value={{value: catagoryId?.name, label: catagoryId?.name}}
            />
            {/* <p className="text-danger">{errors?.catagoryId?.msg}</p> */}
          </div>
          <p className="text-danger">{errors?.catagoryId?.msg}</p>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
