"use client";
import React, { useEffect, useState } from "react";
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

const ageRestrictionsOptions = [
  {value: "Yes", label: "Yes"},
  {value: "No", label: "No"},
  {value: "Any", label: "Any"},
]
const gatedOptions = [
  {value: "Yes", label: "Yes"},
  {value: "No", label: "No"},
  {value: "Any", label: "Any"},
]


const SelectMultiField = ({area, setArea, city, setCity, setState, state, gated, ageRestrictions, setAgeRestrictions, setGated}) => {

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const cityHanlder = (currentState) => {
    setCity("");
    setArea("");
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
        },
        city: {
          _id: city._id,
          name: city.name,
          slug: city.slug,
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
                setState(e.value);
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
                label: `${item?.city?.name}`,
              }))}
              onChange={(e)=> {
                setArea(e.value.area)
                setCity(e.value.city)
              }}
              placeholder="please select"
              value={{value: city?.name, label: city?.name}}
            />
          </div>
        </div>
      </div>
      {/* gated select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Gated</h6>
          <div className="d-flex">
            <Select
              instanceId="asdfdsdfasdf"
              name="gated"
              id="asdfdsdfasdf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={gatedOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e)=> {
                setGated(e.value)
              }}
              placeholder="please select"
              value={{value: gated, label: gated}}
            />
          </div>
        </div>
      </div>
      {/* gated select end */}


      {/* gated select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Age Restrictions</h6>
          <div className="d-flex">
            <Select
              instanceId="sdfkjalksdjf"
              name="agerestrictions"
              id="sdfkjalksdjf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={ageRestrictionsOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e)=> {
                setAgeRestrictions(e.value)
              }}
              placeholder="please select"
              value={{value: ageRestrictions, label: ageRestrictions}}
            />
          </div>
        </div>
      </div>
      {/* gated select end */}
    </>
  );
};

export default SelectMultiField;
