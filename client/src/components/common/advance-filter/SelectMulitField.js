"use client";
import { useEffect, useState } from "react";
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

const ageRestrictionsOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Any", label: "Any" },
];
const gatedOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Any", label: "Any" },
];
const ClosestOptions = [
  { label: "1 Miles", value: 1 },
  { label: "5 Miles", value: 5 },
  { label: "10 Miles", value: 10 },
  { label: "20 Miles", value: 20 },
  { label: "50 Miles", value: 50 },
];
const ConstractionOptions = [
  { label: "No", value: "No" },
  { label: "Yes", value: "Yes" },
];

const SelectMultiField = ({
  area,
  setArea,
  city,
  setCity,
  setState,
  state,
  gated,
  builder,
  setBuilder,
  closestHospital,
  setClosestHospital,
  closestAirport,
  setClosestAirport,
  closestMilitaryBase,
  setClosestMilitaryBase,
  ageRestrictions,
  isNewContraction,
  setIsNewContraction,
  setAgeRestrictions,
  setGated,
}) => {
  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [builderOptions, setBuilderOptions] = useState([]);

  const cityHanlder = (currentState) => {
    setCity("");
    setArea("");
    const areaList =
      currentState.value.area.filter((item) => item.active) || [];

    // Initialize cityOptionValues as an empty array
    let cityOptionValues = [];

    // Iterate over the areaList to extract active cities
    areaList.forEach((area) => {
      const activeCities =
        area.city
          ?.filter((city) => city.active)
          .map((city) => ({
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
  };

  const fetchStateData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/active`,
        { credentials: "include" }
      );
      const stateData = await res.json();
      setStateOptions(stateData.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchBuilders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/getall`,
        { credentials: "include" }
      );
      const builderData = await res.json();
      setBuilderOptions(builderData.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBuilders();
    fetchStateData();
  }, []);

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
              onChange={(e) => {
                cityHanlder(e);
                setState(e.value);
              }}
              value={{ value: state?.name, label: state?.name }}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6 d-none">
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
              onChange={(e) => {
                setArea(e.value.area);
                setCity(e.value.city);
              }}
              placeholder="please select"
              value={{ value: city?.name, label: city?.name }}
            />
          </div>
        </div>
      </div>
      {/* builder select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Builder</h6>
          <div className="d-flex">
            <Select
              instanceId="asdfdsdfasdf"
              name="gated"
              id="asdfdsdfasdf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={builderOptions?.map((item) => ({
                value: item.name,
                label: `${item.name}`,
              }))}
              onChange={(e) => {
                setBuilder(e.value);
              }}
              placeholder="please select"
              value={{
                value: builder,
                label: builder ? builder : "Select",
              }}
            />
          </div>
        </div>
      </div>
      {/* builder select end */}

      {/* construction  select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">New Constraction Only</h6>
          <div className="d-flex">
            <Select
              instanceId="sdfkjalksdjf"
              name="agerestrictions"
              id="sdfkjalksdjf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={ConstractionOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e) => {
                setIsNewContraction(e.value);
              }}
              placeholder="please select"
              value={{ value: isNewContraction, label: isNewContraction }}
            />
          </div>
        </div>
      </div>
      {/* construction select end */}

      {/* Closest Airport select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Closest International Airport</h6>
          <div className="d-flex">
            <Select
              instanceId="sdfkjalksdjf"
              name="agerestrictions"
              id="sdfkjalksdjf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={ClosestOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e) => {
                setClosestAirport(e.value);
              }}
              placeholder="please select"
              value={{
                value: closestAirport,
                label: ` ${closestAirport} ${
                  closestAirport && closestAirport !== "Any" ? "Miles" : ""
                }`,
              }}
            />
          </div>
        </div>
      </div>
      {/* Closest Airport select end */}
      {/* Closest Hospital select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Closest Hospital</h6>
          <div className="d-flex">
            <Select
              instanceId="sdfkjalksdjf"
              name="agerestrictions"
              id="sdfkjalksdjf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={ClosestOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e) => {
                setClosestHospital(e.value);
              }}
              placeholder="please select"
              value={{
                value: closestHospital,
                label: ` ${closestHospital} ${
                  closestHospital && closestHospital !== "Any" ? "Miles" : ""
                }`,
              }}
            />
          </div>
        </div>
      </div>
      {/* Closest Hospital select end */}

      {/* Closest Military select start */}
      <div className="col-sm-6">
        <div className="widget-wrapper">
          <h6 className="list-title">Closest Military Base</h6>
          <div className="d-flex">
            <Select
              instanceId="sdfkjalksdjf"
              name="agerestrictions"
              id="sdfkjalksdjf"
              styles={customStyles}
              className="select-custom"
              classNamePrefix="select"
              // isMulti
              options={ClosestOptions?.map((item) => ({
                value: item.value,
                label: `${item.label}`,
              }))}
              onChange={(e) => {
                setClosestMilitaryBase(e.value);
              }}
              placeholder="please select"
              value={{
                value: closestMilitaryBase,
                label: ` ${closestMilitaryBase} ${
                  closestMilitaryBase && closestMilitaryBase !== "Any"
                    ? "Miles"
                    : ""
                }`,
              }}
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
              onChange={(e) => {
                setGated(e.value);
              }}
              placeholder="please select"
              value={{ value: gated, label: gated }}
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
              onChange={(e) => {
                setAgeRestrictions(e.value);
              }}
              placeholder="please select"
              value={{ value: ageRestrictions, label: ageRestrictions }}
            />
          </div>
        </div>
      </div>
      {/* gated select end */}
    </>
  );
};

export default SelectMultiField;
