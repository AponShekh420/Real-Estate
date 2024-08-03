"use client";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Select from 'react-select'
import { addBlogFieldValue } from "@/redux/blogSlice";

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
  const {errors, catagoryId, subcatagoryId } = useSelector((state)=> state.blog)
  const dispatch = useDispatch()

  // options
  const [catagoryOptions, setCatagoryOptions] = useState([]);
  const [subcatagoryOptions, setSubcatagoryOptions] = useState([]);

  const subcatagoryHanlder = (currentCatagory) => {
    dispatch(addBlogFieldValue({
      subcatagoryId: "",
    }))
    const subcatagoryOptionValues = currentCatagory.value.subcatagory.map(item => item).length > 0 ? currentCatagory.value.subcatagory.map(item => item) : [];
    setSubcatagoryOptions(subcatagoryOptionValues[0] ? subcatagoryOptionValues : []);
  }


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



  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Parent Catagory
          </label>
          <div className="location-area">
            <Select
              id="asdfklasdkflsd"
              instanceId="asdfklasdkflsd"
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
                subcatagoryHanlder(e);
                dispatch(addBlogFieldValue({catagoryId: e.value}))
              }}
              value={{value: catagoryId?.name, label: catagoryId?.name}}
            />
            <p className="text-danger">{errors?.catagoryId?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Subcatagory
          </label>
          <div className="location-area">
            <Select
              instanceId="afasdfasdfasdfasdfsdaf"
              id="afasdfasdfasdfasdfsdaf"
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={subcatagoryOptions?.map((item) => ({
                value: item,
                label: `${item.name}`,
              }))}
              onChange={(e)=> {
                dispatch(addBlogFieldValue({subcatagoryId: e.value}))
              }}
              placeholder="please select"
              value={{value: subcatagoryId?.name, label: subcatagoryId?.name}}
            />
            <p className="text-danger">{errors?.subcatagoryId?.msg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
