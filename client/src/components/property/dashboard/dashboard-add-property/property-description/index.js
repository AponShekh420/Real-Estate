"use client";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const PropertyDescription = () => {
  const {title, homeTypes, active, status, maxPrice, minPrice} = useSelector((state)=> state.community)
  const dispatch = useDispatch();

  const homeTypeOptions= [
    { value: "Single", label: "Single" },
    { value: "Family", label: "Family" },
    { value: "Condos", label: "Condos" },
    { value: "Manufactured", label: "Manufactured" },
    { value: "Attached", label: "Attached" },
  ];
  const listedIn = [
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
  ];
  const communityStatus = [
    { value: "Rent", label: "Rent" },
    { value: "Sold", label: "Sold" },
    { value: "Buy", label: "Buy" },
  ];

  const valueChecker = (e) => {
    console.log("eventvalue:", e)
    console.log(title, homeTypes, active, status, minPrice, maxPrice)
  }

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
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your community title"
              onChange={(e)=> {
                valueChecker(e)
                dispatch(addCommunityFieldValue({
                  title: e.target.value
                }))
              }}
              value={title}
            />
          </div>
        </div>
        {/* End .col-12 */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Home Type
            </label>
            <div className="location-area">
              <Select
                name="colors"
                options={homeTypeOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                onChange={(e)=> {
                  dispatch(addCommunityFieldValue({
                    homeTypes: e.map((eachElement)=> eachElement.value)
                  }))
                }}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Listed in
            </label>
            <div className="location-area">
              <Select
                defaultValue={[listedIn[0]]}
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={(e)=> {
                  valueChecker(e)
                  dispatch(addCommunityFieldValue({
                    active: e.value === "Pending" ? false : true
                  }))
                }}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Community Status
            </label>
            <div className="location-area">
              <Select
                defaultValue={[communityStatus[1]]}
                name="colors"
                options={communityStatus}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                onChange={(e)=> {
                  valueChecker(e)
                  dispatch(addCommunityFieldValue({
                    status: e.map((eachElement)=> eachElement.value)
                  }))
                }}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Min Price in $
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Number"
              onChange={(e)=> {
                valueChecker(e)
                dispatch(addCommunityFieldValue({
                  minPrice: e.target.value
                }))
              }}
              value={minPrice}
            />
          </div>
        </div>
        {/* End .col-6 */}
        
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Max Price in $
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Number"
              onChange={(e)=> {
                valueChecker(e)
                dispatch(addCommunityFieldValue({
                  maxPrice: e.target.value
                }))
              }}
              value={maxPrice}
            />
          </div>
        </div>
        {/* End .col-6 */}


      </div>
    </form>
  );
};

export default PropertyDescription;
