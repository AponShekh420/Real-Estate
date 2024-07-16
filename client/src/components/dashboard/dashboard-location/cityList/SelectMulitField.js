"use client";
import React, { useEffect, useState } from "react";
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
  const [stateValue, setStateValue] = useState("");
  // options
  const [stateOptions, setStateOptions] = useState([]);

  const fetchStateData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/state/getall');
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
              onChange={(e)=> setStateValue(e)}
              value={stateValue}
            />
            {/* <p className="text-danger">{errors?.stateId?.msg}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
