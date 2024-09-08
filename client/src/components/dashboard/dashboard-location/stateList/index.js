"use client"

import React, { useState } from "react";
import SelectMulitField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "@/components/common/styles/quillEditor.css"
import { addStateFields, removeStateAllFields } from "@/redux/stateSlice";
import {modules, formats} from '@/components/common/quillEditorConfig'
import dynamic from "next/dynamic";
import UploadLocationImg from "./UploadLocationImg";
import { ImUpload } from "react-icons/im";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const StateList = () => {
  const [stateLoading, setStateLoading] = useState(false);

  // state location
  const {abbreviation, desc, errors, active: stateActive, abbreviation: stateAbbreviation, stateName, edit: stateEdit, stateId: stateUpdateId, uploadedImageChanged: stateUploadedImageChanged, oldImgUrl: stateOldImgUrl, uploadedImage: stateUploadedImage} = useSelector((state)=> state.state);



  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(addStateFields({
      desc: e
    }))
  }

  const cancelStateUpdate = () => {
    dispatch(removeStateAllFields())
  }

  const uploadNewState = async (e) => {
    e.preventDefault();

    // console.log("stateName:", stateName);
    const formData = new FormData(e.target);
    formData.append("active", stateActive);
    formData.append("abbreviation", stateAbbreviation);
    formData.append("name", stateName);
    formData.append("desc", desc);

    const manualData = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: stateActive,
        abbreviation: stateAbbreviation,
        name: stateName,
        desc: desc,
        uploadedImageChanged: false,
      })
    }
    
    const multipartDataWithFile = {
      method: "POST",
      credentials: "include",
      body: formData
    }

    const bodyData = stateUploadedImageChanged ? multipartDataWithFile : manualData;
    try {
      setStateLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/add`, bodyData);
      const currentState = await res.json();
      setStateLoading(false);
      if(currentState.msg) {
        toast.success(currentState.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeStateAllFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addStateFields({
          errors: currentState.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }



  // state udpate
  const updateExistingState = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("active", stateActive);
    formData.append("abbreviation", stateAbbreviation);
    formData.append("name", stateName);
    formData.append("desc", desc);
    formData.append("stateId", stateUpdateId);
    formData.append("uploadedImageChanged", stateUploadedImageChanged);
    formData.append("oldImgUrl", stateOldImgUrl);
    formData.append("uploadedImage", stateUploadedImage);

    const manualData = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: stateActive,
        abbreviation: stateAbbreviation,
        name: stateName,
        desc: desc,
        stateId: stateUpdateId,
        uploadedImageChanged: false
      })
    }

    const multipartDataWithFile = {
      method: "PUT",
      credentials: "include",
      body: formData
    }

    const bodyData = stateUploadedImageChanged ? multipartDataWithFile : manualData;

    try {
      setStateLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/update`, bodyData);
      const currentState = await res.json();
      setStateLoading(false);
      if(currentState.msg) {
        toast.success(currentState.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeStateAllFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addStateFields({
          errors: currentState.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <form className="form-style1"
      onSubmit={stateEdit ? updateExistingState : uploadNewState} 
      action={stateEdit ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/add`} 
      method={stateEdit ? "put": "post"} 
      encType="multipart/form-data"
    >
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title fz17 mb30">Creating State</h4>
        <div className="d-flex align-items-center gap-2 flex-row-reverse">
          <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${stateLoading ? "opacity-50" : "opacity-100"}`} disabled={stateLoading} type="submit">{stateEdit ? "Update State": "Add New State"}
            {!stateLoading ? <ImUpload /> : <HashLoader
              color="#ffffff"
              loading={stateLoading}
              cssOverride={override}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            }
          </button>
          {stateEdit ? (
            <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelStateUpdate}>
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
            value={desc}
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
