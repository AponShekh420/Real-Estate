"use client"

import React, { useState } from "react";
import SelectMulitField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import {modules, formats} from '@/components/common/quillEditorConfig'
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import dynamic from "next/dynamic";
import { ImUpload } from "react-icons/im";
import { HashLoader } from "react-spinners";
import UploadLocationImg from "./UploadLocationImg";
import { addStateFields } from "@/redux/stateSlice";
import { toast } from "react-toastify";
import { addCityFields, removeAllCityFields } from "@/redux/citySlice";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const CityList = () => {
  const [cityLoading, setCityLoading] = useState(false);

  // redux
  const {errors, active: cityActive, desc, abbreviation, cityName, stateId: stateIdForCity, areaId: areaIdForCity, edit: cityEdit, cityId: cityUpdateId, uploadedImageChanged: cityUploadedImageChanged, oldImgUrl: cityOldImgUrl, uploadedImage: cityUploadedImage} = useSelector((state)=> state.city);

  const dispatch = useDispatch();


  // editor text handling
  const handleChange = (e) => {
    dispatch(addCityFields({
      desc: e
    }))
  }

  const uploadNewCity = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("active", cityActive);
    formData.append("abbreviation", abbreviation);
    formData.append("name", cityName);
    formData.append("desc", desc);
    formData.append("stateId", stateIdForCity._id);
    formData.append("areaId", areaIdForCity._id);

    const manualData = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: cityActive,
        abbreviation: abbreviation,
        name: cityName,
        desc: desc,
        stateId: stateIdForCity._id,
        areaId: areaIdForCity._id,
        uploadedImageChanged: false,
      })
    }
    
    const multipartDataWithFile = {
      method: "POST",
      credentials: "include",
      body: formData
    }

    const bodyData = cityUploadedImageChanged ? multipartDataWithFile : manualData;

    
    try {
      setCityLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/add`, bodyData);
      const currentCity = await res.json();
      setCityLoading(false);
      if(currentCity.msg) {
        toast.success(currentCity.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllCityFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCityFields({
          errors: currentCity.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  // area update
  const updateExistingCity = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    formData.append("active", cityActive);
    formData.append("abbreviation", abbreviation);
    formData.append("name", cityName);
    formData.append("desc", desc);
    formData.append("stateId", stateIdForCity._id);
    formData.append("areaId", areaIdForCity._id);
    formData.append("cityId", cityUpdateId);
    formData.append("uploadedImageChanged", cityUploadedImageChanged);
    formData.append("oldImgUrl", cityOldImgUrl);
    formData.append("uploadedImage", cityUploadedImage);

    const manualData = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: cityActive,
        abbreviation: abbreviation,
        name: cityName,
        desc: desc,
        stateId: stateIdForCity._id,
        areaId: areaIdForCity._id,
        cityId: cityUpdateId,
        uploadedImageChanged: false
      })
    }

    const multipartDataWithFile = {
      method: "PUT",
      credentials: "include",
      body: formData
    }

    const bodyData = cityUploadedImageChanged ? multipartDataWithFile : manualData;

    try {
      setCityLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/update`, bodyData);
      const currentCity = await res.json();
      setCityLoading(false);
      if(currentCity.msg) {
        toast.success(currentCity.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllCityFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCityFields({
          errors: currentCity.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const cancelCityUpdate = () => {
    dispatch(removeAllCityFields())
  }


  return (
    <form 
      className="form-style1"
      onSubmit={cityEdit ? updateExistingCity : uploadNewCity} 
      action={cityEdit ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/add`} 
      method={cityEdit ? "put": "post"} 
      encType="multipart/form-data"
    >

      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title fz17 mb30">Creating City</h4>
        <div className="d-flex align-items-center gap-2 flex-row-reverse">
          <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${cityLoading ? "opacity-50" : "opacity-100"}`} disabled={cityLoading} type="submit">{cityEdit ? "Update City": "Add New City"}
            {!cityLoading ? <ImUpload /> : <HashLoader
              color="#ffffff"
              loading={cityLoading}
              cssOverride={override}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            }
          </button>
          {cityEdit ? (
            <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelCityUpdate}>
              Cancel
            </button>
          ): (
            ""
          )}
        </div>
      </div>


      <div className="row">
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <UploadLocationImg/>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <SelectMulitField />
        {/* selection fields end */}
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addCityFields({cityName: e.target.value}))
              }}
              value={cityName}
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
                dispatch(addCityFields({abbreviation: e.target.value}))
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
            value={desc}
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
