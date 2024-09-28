"use client"

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import Select from 'react-select'


const ageRes = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const gatedOption = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const DetailsFiled = () => {

  const {errors, ageRestrictions, gated, website, builtEnd, builtStart, communitySize, phone} = useSelector((state)=> state.community);
  const dispatch = useDispatch();

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




  return (
    <div className="form-style1">
      <div className="row">

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Age Restrictions
            </label>
            <div className="location-area">
              <Select
                id="sdfasdfasdf"
                instanceId="sdfasdfasdf"
                defaultValue={[ageRes[0]]}
                name="colors"
                options={ageRes}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(e)=> {
                  dispatch(addCommunityFieldValue({
                    ageRestrictions: e.value === "Yes" ? true : false
                  }))
                }}
                value={{value: ageRestrictions ? "Yes" : "No", label: ageRestrictions ? "Yes" : "No"}}
              />
            </div>
          </div>
        </div>
        {/* end */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Gated
            </label>
            <div className="location-area">
              <Select
                id="afdasdfasd"
                instanceId="afdasdfasd"
                defaultValue={[gatedOption[0]]}
                name="colors"
                options={gatedOption}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(e)=> {
                  dispatch(addCommunityFieldValue({
                    gated: e.value === "Yes" ? true : false
                  }))
                }}
                value={{value: gated ? "Yes" : "No", label: gated ? "Yes" : "No"}}
              />
            </div>
          </div>
        </div>

        {/* end */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              webiste
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="https://placeholder.com"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  website: e.target.value
                }))
              }}
              value={website}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your phone number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  phone: e.target.value
                }))
              }}
              value={phone}
            />
            <p className="text-danger">{errors?.phone?.msg}</p>
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Community Size</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type the community size"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  communitySize: e.target.value
                }))
              }}
              value={communitySize}
            />
            <p className="text-danger">{errors?.communitySize?.msg}</p>
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Built Start
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Type the date"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  builtStart: e.target.value
                }))
              }}
              value={builtStart}
            />
            <p className="text-danger">{errors?.builtStart?.msg}</p>
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Built End
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Type the date"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  builtEnd: e.target.value
                }))
              }}
              value={builtEnd}
            />
            <p className="text-danger">{errors?.builtEnd?.msg}</p>
          </div>
        </div>
        {/* End .col-4 */}
      </div>
    </div>
  );
};

export default DetailsFiled;
