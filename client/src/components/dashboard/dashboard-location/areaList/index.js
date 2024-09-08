"use client"

import React, { useState } from "react";
import SelectMulitField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import { addAreaFields, removeAllAreaFields } from "@/redux/areaSlice";
import {modules, formats} from '@/components/common/quillEditorConfig'
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import dynamic from "next/dynamic";
import { ImUpload } from "react-icons/im";
import { HashLoader } from "react-spinners";
import UploadLocationImg from "./UploadLocationImg";
import { addStateFields } from "@/redux/stateSlice";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AreaList = () => {
  const [areaLoading, setAreaLoading] = useState(false);

  // redux
  const {errors, active: areaActive, desc, abbreviation, areaName, stateId: stateIdForArea, cityId: cityIdForArea, edit: areaEdit, areaId: areaUpdateId, uploadedImageChanged: areaUploadedImageChanged, oldImgUrl: areaOldImgUrl, uploadedImage: areaUploadedImage} = useSelector((state)=> state.area);

  const dispatch = useDispatch();


  // editor text handling
  const handleChange = (e) => {
    dispatch(addAreaFields({
      desc: e
    }))
  }

  const uploadNewArea = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("active", areaActive);
    formData.append("abbreviation", abbreviation);
    formData.append("name", areaName);
    formData.append("desc", desc);
    formData.append("stateId", stateIdForArea._id);
    formData.append("cityId", cityIdForArea._id);

    const manualData = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: areaActive,
        abbreviation: abbreviation,
        name: areaName,
        desc: desc,
        stateId: stateIdForArea._id,
        cityId: cityIdForArea._id,
        uploadedImageChanged: false,
      })
    }
    
    const multipartDataWithFile = {
      method: "POST",
      credentials: "include",
      body: formData
    }

    const bodyData = areaUploadedImageChanged ? multipartDataWithFile : manualData;

    
    try {
      setAreaLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/add`, bodyData);
      const currentArea = await res.json();
      setAreaLoading(false);
      if(currentArea.msg) {
        toast.success(currentArea.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllAreaFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addAreaFields({
          errors: currentArea.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  // area update
  const updateExistingArea = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    formData.append("active", areaActive);
    formData.append("abbreviation", abbreviation);
    formData.append("name", areaName);
    formData.append("desc", desc);
    formData.append("stateId", stateIdForArea._id);
    formData.append("cityId", cityIdForArea._id);
    formData.append("areaId", areaUpdateId);
    formData.append("uploadedImageChanged", areaUploadedImageChanged);
    formData.append("oldImgUrl", areaOldImgUrl);
    formData.append("uploadedImage", areaUploadedImage);

    const manualData = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: areaActive,
        abbreviation: abbreviation,
        name: areaName,
        desc: desc,
        stateId: stateIdForArea._id,
        cityId: cityIdForArea._id,
        areaId: areaUpdateId,
        uploadedImageChanged: false
      })
    }

    const multipartDataWithFile = {
      method: "PUT",
      credentials: "include",
      body: formData
    }

    const bodyData = areaUploadedImageChanged ? multipartDataWithFile : manualData;

    try {
      setAreaLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/update`, bodyData);
      const currentArea = await res.json();
      setAreaLoading(false);
      if(currentArea.msg) {
        toast.success(currentArea.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllAreaFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addAreaFields({
          errors: currentArea.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const cancelAreaUpdate = () => {
    dispatch(removeAllAreaFields())
  }


  return (
    <form 
      className="form-style1"
      onSubmit={areaEdit ? updateExistingArea : uploadNewArea} 
      action={areaEdit ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/add`} 
      method={areaEdit ? "put": "post"} 
      encType="multipart/form-data"
    >

      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title fz17 mb30">Creating Area</h4>
        <div className="d-flex align-items-center gap-2 flex-row-reverse">
          <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${areaLoading ? "opacity-50" : "opacity-100"}`} disabled={areaLoading} type="submit">{areaEdit ? "Update Area": "Add New Area"}
            {!areaLoading ? <ImUpload /> : <HashLoader
              color="#ffffff"
              loading={areaLoading}
              cssOverride={override}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            }
          </button>
          {areaEdit ? (
            <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelAreaUpdate}>
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

export default AreaList;
