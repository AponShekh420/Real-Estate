"use client"

import { useEffect, useState } from "react";
import SelectMulitField from "./SelectMulitField";

// quill text editor imports
import React from "react";
import {modules, formats} from '@/components/common/quillEditorConfig'
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import { useDispatch, useSelector } from "react-redux";
import { addCityFields } from "@/redux/citySlice";
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const CityList = () => {
  const {errors, cityName, description, abbreviation} = useSelector((state)=> state.city);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(addCityFields({
      description: e
    }))
  }

  return (
    <form className="form-style1">
      <div className="row">
        
        <SelectMulitField />

        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> dispatch(addCityFields({
                cityName: e.target.value
              }))}
              value={cityName}
              placeholder="Type a city name"
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>

        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Abbreviation</label>
            <input type="text" className="form-control" 
              onChange={(e)=> dispatch(addCityFields({
                abbreviation: e.target.value
              }))}
              value={abbreviation}
              placeholder="Type abbreviations name of the city"
            />
            <p className="text-danger">{errors?.abbreviation?.msg}</p>
          </div>
        </div>

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

export default CityList;
