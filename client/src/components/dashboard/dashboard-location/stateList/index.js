"use client"

import React from "react";
import SelectMulitField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import { addStateFields } from "@/redux/stateSlice";
import {modules, formats} from '@/components/common/quillEditorConfig'

const StateList = () => {
  const { errors, stateName, abbreviation, description } = useSelector((state)=> state.state)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(addStateFields({
      description: e
    }))
  }

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">State Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addStateFields({stateName: e.target.value}))
              }}
              value={stateName}
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
                dispatch(addStateFields({abbreviation: e.target.value}))
              }}
              value={abbreviation}
            />
            <p className="text-danger">{errors?.abbreviation?.msg}</p>
          </div>
        </div>
        {/* End .col-sm-6 */}


        <SelectMulitField />

        <div className="text-editor">
          {/* <EditorToolbar /> */}
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
    </form>
  );
};

export default StateList;
