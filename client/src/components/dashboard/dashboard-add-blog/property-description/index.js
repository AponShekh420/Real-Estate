"use client";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import SelectMultiField from "./SelectMulitField";
import { addBlogFieldValue } from "@/redux/blogSlice";

// text editor items
import {modules, formats} from '@/components/common/quillEditorConfig'
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import dynamic from "next/dynamic";
import Categories from "./Categories";


// Dynamically import React Quill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const PropertyDescription = () => {
  const {errors, title, desc, active} = useSelector((state)=> state.blog)
  const dispatch = useDispatch();

  const listedIn = [
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
  ];

  const handleChange = (e) => {
    dispatch(addBlogFieldValue({
      desc: e
    }))
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
    <div className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your community title"
              onChange={(e)=> {
                dispatch(addBlogFieldValue({
                  title: e.target.value
                }))
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
                required
                onChange={(e)=> {
                  dispatch(addBlogFieldValue({
                    active: e.value === "Pending" ? false : true
                  }))
                }}
                value={{value: active ? "Approved" : "Pending", label: active ? "Approved" : "Pending"}}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}



        <div className="text-editor">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
          <p className="text-danger">{errors?.desc?.msg}</p>
        </div>
        {/* End .col-6 */}




        <div className="col-12 mt30">
          <div className="ps-widget bgc-white bdrs12 overflow-hidden position-relative">
            <h4 className="title fz17">Select Categories</h4>
            <div className="row">
              <Categories />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

      </div>
    </div>
  );
};

export default PropertyDescription;
