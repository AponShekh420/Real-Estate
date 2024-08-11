"use client";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { addCommunityFieldValue } from "@/redux/communitySlice";
import Select from 'react-select'
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";

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
  const { state, city } = useSelector((state)=> state.communityFilter)
  const dispatch = useDispatch()

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const cityHanlder = (currentState) => {
    dispatch(addCommunityFilterValue({
      city: "",
    }))
    const cityOptionValues = currentState.value.city.map(item => item.active && item).length > 0 ? currentState.value.city.map(item => item.active && item) : [];
    setCityOptions(cityOptionValues[0] ? cityOptionValues : []);
  }

  const fetchStateData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/active`);
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
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">State</h6>
          <div className="d-flex">
            <Select
              id="asdiuofjasido"
              instanceId="asdiuofjasido"
              styles={customStyles}
              name="state"
              className="select-custom"
              classNamePrefix="select"
              required
              // isMulti
              options={stateOptions?.map((item) => ({
                value: item,
                label: `${item.name}`,
              }))}
              onChange={(e)=> {
                cityHanlder(e);
                dispatch(addCommunityFilterValue({state: e.value}))
              }}
              value={{value: state?.name, label: state?.name}}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">City</h6>
          <div className="d-flex">
            <Select
              instanceId="asdfasdfasde"
              name="city"
              id="asdfasdfasde"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={cityOptions?.map((item) => ({
                value: item,
                label: `${item.name}`,
              }))}
              onChange={(e)=> {
                dispatch(addCommunityFilterValue({city: e.value}))
              }}
              placeholder="please select"
              value={{value: city?.name, label: city?.name}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
