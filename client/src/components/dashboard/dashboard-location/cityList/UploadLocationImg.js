"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCityFields } from "@/redux/citySlice";

const UploadLocationImg = () => {
  // redux
  const {errors, uploadedImage, uploadedImageChanged, oldImgUrl} = useSelector((state)=> state.city);
  const dispatch = useDispatch();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(addCityFields({
          uploadedImage: e.target.result,
          uploadedImageChanged: true
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile-box position-relative d-md-flex align-items-end mb50">
        <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm" style={{height: "100px", width: "100px"}}>
          <Image
            width={100}
            height={100}
            className="w-100 cover h-100"
            src={(!uploadedImageChanged && oldImgUrl ) ? `${process.env.SERVER_IMG_PATH}/assets/location/${oldImgUrl}` : uploadedImage || "/images/listings/profile-1.jpg"}
            alt="profile avatar"
          />

          {/* <a
            className="tag-del"
            style={{ border: "none", height: "25px", width: "25px", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}
            data-tooltip-id="profile_del"
            onClick={() => dispatch(addStateFields({
              uploadedImage: null,
              uploadedImageChanged: true,
            }))}
          >
            <span className="fas fa-trash-can" style={{fontSize: "10px", lineHeight: "0"}}/>
          </a> */}

          <ReactTooltip id="profile_del" place="right" content="Delete Image" />
        </div>
        {/* End .profile-img */}

        <div className="profile-content ml30 ml0-sm">
          <label className="upload-label pointer">
            <input
              name="img"
              type="file"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
            <div className="ud-btn btn-white2 mb10 d-flex p-2 rounded-2 align-items-center" style={{fontSize: "13px"}}>
              Upload
              <i className="fal fa-arrow-right-long" style={{fontSize: "13px", fontWeight: 500}}/>
            </div>
          </label>
          <p className={`text ${errors?.img?.msg ? "text-danger": null}`}>
            {errors?.img?.msg || "Photos must be JPEG, JPG or PNG format"}
          </p>
        </div>
      </div>
    </>
  );
};

export default UploadLocationImg;
