"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";

const ProfileBox = ({setUploadedImage, uploadedImage, setUploadedImageChanged, errors, uploadedImageChanged, oldImgUrl, userInfo, update}) => {
    
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setUploadedImageChanged(true)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile-box position-relative d-md-flex align-items-end mb50">
        <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
          <Image
            width={240}
            height={220}
            className="w-100 cover h-100"
            src={(!uploadedImageChanged && oldImgUrl ) ? userInfo?.avatar : uploadedImage || "/images/listings/profile-1.jpg"}
            alt="profile avatar"
          />

          {update ? (
            <>
              <a
                className="tag-del pointer"
                style={{ border: "none" }}
                data-tooltip-id="profile_del"
                onClick={() => {
                  setUploadedImage(null);
                  setUploadedImageChanged(true);
                  }
                }
              >
                <span className="fas fa-trash-can" />
              </a>

              <ReactTooltip id="profile_del" place="right" content="Delete Image" />
            </>
          ) : null}
        </div>
        {/* End .profile-img */}

        {update ? (
          <div className="profile-content ml30 ml0-sm">
            <label className="upload-label pointer">
              <input
                name="img"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
              <div className="ud-btn btn-white2 mb30">
                Upload Model Image
                <i className="fal fa-arrow-right-long" />
              </div>
            </label>
            <p className={`text ${errors?.img?.msg ? "text-danger": null}`}>
              {errors?.img?.msg || "Photos must be JPEG, JPG or PNG format"}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProfileBox;
