"use client";
import { formats, modules } from "@/components/common/quillEditorConfig";
import "@/components/common/styles/quillEditor.css";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// Dynamically import React Quill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const PropertyDescription = () => {
  const { errors, title, homeTypes, active, maxPrice, minPrice, description } =
    useSelector((state) => state.community);
  const dispatch = useDispatch();

  const homeTypeOptions = [
    { value: "Single-Family", label: "Single-Family" },
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
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your community title"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    title: e.target.value,
                  })
                );
              }}
              value={title}
            />
            <p className="text-danger">{errors?.title?.msg}</p>
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
                id="sdjfsdjfksj"
                instanceId="sdjfsdjfksj"
                name="colors"
                options={homeTypeOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                isMulti
                onChange={(e) => {
                  if (e.length > 0) {
                    dispatch(
                      addCommunityFieldValue({
                        homeTypes: e.map((eachElement) => eachElement.value),
                      })
                    );
                  } else {
                    dispatch(
                      addCommunityFieldValue({
                        homeTypes: [],
                      })
                    );
                  }
                }}
                value={homeTypes.map((eachElement) => ({
                  value: eachElement,
                  label: eachElement,
                }))}
              />
              <p className="text-danger">{errors?.homeTypes?.msg}</p>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Status
            </label>
            <div className="location-area">
              <Select
                instanceId="sdfjssdfiowre"
                id="sdfjssdfiowre"
                defaultValue={[listedIn[0]]}
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(e) => {
                  dispatch(
                    addCommunityFieldValue({
                      active: e.value === "Pending" ? false : true,
                    })
                  );
                }}
                value={{
                  value: active ? "Active" : "Pending",
                  label: active ? "Active" : "Pending",
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
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    minPrice: e.target.value,
                  })
                );
              }}
              value={minPrice}
            />
            <p className="text-danger">{errors?.minPrice?.msg}</p>
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
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    maxPrice: e.target.value,
                  })
                );
              }}
              value={maxPrice}
            />
            <p className="text-danger">{errors?.maxPrice?.msg}</p>
          </div>
        </div>
        {/* End .col-7 */}

        <div className="col-sm-6 col-xl-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Description
            </label>
            <div className="text-editor">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(e) =>
                  dispatch(
                    addCommunityFieldValue({
                      description: e,
                    })
                  )
                }
                placeholder={"Write Description"}
                modules={modules}
                formats={formats}
              />
              <p className="text-danger">{errors?.desc?.msg}</p>
            </div>
            {/* End .col-7 */}
          </div>
        </div>
        {/* End .row */}
      </div>
    </div>
  );
};

export default PropertyDescription;
