import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addCommunityFieldValue } from "@/redux/communitySlice";


const ageRes = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const gatedOption = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const DetailsFiled = () => {

  const {ageRestrictions, gated, website, sqft, garages, builtEnd, builtStart, bathrooms, bedrooms, communitySize, phone} = useSelector((state)=> state.community);
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
    <form className="form-style1">
      <div className="row">

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Age Restrictions
            </label>
            <div className="location-area">
              <Select
                defaultValue={[ageRes[0]]}
                name="colors"
                options={ageRes}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
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
                defaultValue={[gatedOption[0]]}
                name="colors"
                options={gatedOption}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
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
              type="number"
              className="form-control"
              placeholder="Type your phone number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  phone: e.target.value
                }))
              }}
              value={phone}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Community Size</label>
            <input
              type="number"
              className="form-control"
              placeholder="Type the community size"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  communitySize: e.target.value
                }))
              }}
              value={communitySize}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Bedrooms
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Type the room number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  bedrooms: e.target.value
                }))
              }}
              value={bedrooms}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Bathrooms
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Type the number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  bathrooms: e.target.value
                }))
              }}
              value={bathrooms}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Built Start
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type the date"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  builtStart: e.target.value
                }))
              }}
              value={builtStart}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Built End
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type the date"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  builtEnd: e.target.value
                }))
              }}
              value={builtEnd}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Garages
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Type the number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  garages: e.target.value
                }))
              }}
              value={garages}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Sqft
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Type the Sqft Number"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({
                  sqft: e.target.value
                }))
              }}
              value={sqft}
            />
          </div>
        </div>
        {/* End .col-4 */}

      </div>
    </form>
  );
};

export default DetailsFiled;
