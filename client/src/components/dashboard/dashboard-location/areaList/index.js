"use client"

import React from "react";
import SelectMulitField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import { addAreaFields } from "@/redux/areaSlice";
import {modules, formats} from '@/components/common/quillEditorConfig'
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const AreaList = () => {
  const {errors, areaName, abbreviation, description} = useSelector((state)=> state.area)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(addAreaFields({
      description: e
    }))
  }

  return (
    <form className="form-style1">
      <div className="row">
        <SelectMulitField />
        {/* selection fields end */}
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Area Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addAreaFields({areaName: e.target.value}))
              }}
              value={areaName}
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-12 col-xl-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Abbreviation
            </label>
            <input type="text" className="form-control"
              onChange={(e)=> {
                dispatch(addAreaFields({abbreviation: e.target.value}))
              }}
              value={abbreviation}
            />
            <p className="text-danger">{errors?.abbreviation?.msg}</p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="text-editor">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default AreaList;
