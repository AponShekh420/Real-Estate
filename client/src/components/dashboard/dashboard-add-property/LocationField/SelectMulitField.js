"use client";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { addCommunityFieldValue } from "@/redux/communitySlice";
import Select from 'react-select'

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

  const cityHanlder = (currentState) => {
    dispatch(addCommunityFieldValue({
      cityId: "",
      areaId: ""
    }))
    const areaList = currentState.value.area.filter(item => item.active) || [];

    // Initialize cityOptionValues as an empty array
    let cityOptionValues = [];

    // Iterate over the areaList to extract active cities
    areaList.forEach(area => {
      const activeCities = area.city?.filter(city => city.active).map(city => ({
        area: {
          _id: area._id,
          slug: area.slug,
          name: area.name,
          active: area.active
        },
        city: {
          _id: city._id,
          name: city.name,
          slug: city.slug,
          active: city.active
        },
      })) || [];

      // Append active cities to cityOptionValues
      cityOptionValues = [...cityOptionValues, ...activeCities];
    });
    
    setCityOptions(cityOptionValues[0] ? cityOptionValues : []);
  }


  const fetchStateData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/active`, {credentials: "include"});
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
              id="dskjfkasduiofusdiou"
              instanceId="dskjfkasduiofusdiou"
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
                cityHanlder(e);
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
            City
          </label>
          <div className="location-area">
            <Select
              instanceId="dsfjasdiouwei"
              id="dsfjasdiouwei"
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={cityOptions?.map((item) => ({
                value: item,
                label: `${item?.city?.name} (${item?.city?.active ? "Active": "Deactive"})`,
              }))}
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({cityId: e.value.city, areaId: e.value.area}))
              }}
              placeholder="please select"
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
