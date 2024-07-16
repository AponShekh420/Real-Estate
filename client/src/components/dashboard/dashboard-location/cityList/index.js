import { useEffect, useState } from "react";
import SelectMulitField from "./SelectMulitField";

// quill text editor imports
import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/common/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"

const CityList = () => {
  const [cityName, setCityName] = useState("");
  const [abbreviationName, setAbbreviation] = useState("");
  const [description, setDescription] = useState("");


  const handleChange = (e) => {
    setDescription(e);
  }

  return (
    <form className="form-style1">
      <div className="row">
        
        <SelectMulitField />

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> setCityName(e.target.value)}
              value={cityName}
              placeholder="Type a city name"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Abbreviation</label>
            <input type="text" className="form-control" 
              onChange={(e)=> setAbbreviation(e.target.value)}
              value={abbreviationName}
              placeholder="Type abbreviations name of the city"
            />
          </div>
        </div>

        <div className="text-editor">
          <EditorToolbar />
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
