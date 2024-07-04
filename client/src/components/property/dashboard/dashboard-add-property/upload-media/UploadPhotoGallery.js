"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";

const UploadPhotoGallery = () => {
  const fileInputRef = useRef(null);

  // redux
  const {imgs} = useSelector((state)=> state.community);
  const dispatch = useDispatch();

  const handleUpload = async (files) => {
    
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const res = await fetch("http://localhost:5000/api/community/upload", {
        method: "POST",
        body: formData
      })
      const {message: imgsData} = await res.json();
      console.log(imgsData)
      const newImages = [...imgs, ...imgsData];
      dispatch(addCommunityFieldValue({
        imgs: newImages
      }))
    } catch(err) {
      console.log(err.message)
    }
  };


  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = async (index) => {
    const newImages = [...imgs];
    const deletedImage = newImages.splice(index, 1);
    const DeletedImageUrl = deletedImage[0];
    try {
      const res = await fetch("http://localhost:5000/api/community/imgdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imgUrl: DeletedImageUrl
        })
      })
      await res.json();
      dispatch(addCommunityFieldValue({
        imgs: newImages
      }));
    } catch(err){
      console.log(err.message)
    }
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
        <p className="text mb25">
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
        <label className="ud-btn btn-white">
          Browse Files
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e.target.files)}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {imgs.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <Image
                width={212}
                height={194}
                className="w-100 bdrs12 cover"
                src={`http://localhost:5000/assets/communityImgs/${imageData}`}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(index)}
                type="button"
                data-tooltip-id={`delete-${index}`}
              >
                <span className="fas fa-trash-can" />
              </button>

              <ReactTooltip
                id={`delete-${index}`}
                place="right"
                content="Delete Image"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;
