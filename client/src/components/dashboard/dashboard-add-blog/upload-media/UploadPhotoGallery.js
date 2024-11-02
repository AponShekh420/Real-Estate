"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addBlogFieldValue } from "@/redux/blogSlice";


const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "red",
};





const UploadPhotoGallery = () => {

  const {img, uploadedImage, uploadedImageChanged, oldImgUrl, errors } = useSelector(state => state?.blog)
  const dispatch = useDispatch();


  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(addBlogFieldValue({
          uploadedImage: e.target.result,
          uploadedImageChanged: true,
        }))
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30"
      >
        
        <div className="icon mb30" style={{visibility: "visible"}}>
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10" style={{visibility: "visible"}}>Upload/Drag photos of your property</h4>
        <p className="text mb25" style={{visibility: "visible"}}>
          Photos must be JPEG, JPG or PNG format
        </p>
        <label className="ud-btn btn-white" style={{visibility: "visible"}}>
          Browse Files
          <input
            name="img"
            id="fileInput"
            type="file"
            className="ud-btn btn-white"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>

        {/* Display uploaded images */}
        {((!uploadedImageChanged && oldImgUrl) || uploadedImage) ? (
          <div className="profile-box w-100 h-100 position-absolute top-0" style={{zIndex: ((!uploadedImageChanged && oldImgUrl) || uploadedImage) ? "" : "-10"}}>
            <div className="w-100 h-100">
              <div className="profile-img w-100 h-100">
                <Image
                  width={100}
                  height={100}
                  className="w-100 h-100 bdrs12 cover"
                  src={(!uploadedImageChanged && oldImgUrl ) ? img : uploadedImage || ""}
                  alt={`Uploaded Image ${(!uploadedImageChanged && oldImgUrl ) ? img : uploadedImage || ""}`}
                />
                <button
                  style={{ border: "none" }}
                  className="tag-del"
                  title="Delete Image"
                  onClick={() => dispatch(addBlogFieldValue({
                    uploadedImage: null,
                    uploadedImageChanged: true,
                  }))}
                  type="button"
                  data-tooltip-id={`delete-55555565`}
                >
                  <span className="fas fa-trash-can" />
                </button>

                <ReactTooltip
                  id={`delete-55555565`}
                  place="right"
                  content="Delete Image"
                />
              </div>
            </div>
          </div>):  (<div></div>)}
      </div>
      <p className="text-danger fs-4">{errors?.img?.msg}</p>
    </>
  );
};

export default UploadPhotoGallery;
