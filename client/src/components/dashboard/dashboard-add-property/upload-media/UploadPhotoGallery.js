"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";

const UploadPhotoGallery = () => {
  // redux 
  const {thumbnail, existingImages, newImages, deletedImages, imgs, errors} = useSelector(state => state?.community);
  const dispatch = useDispatch();

  const [uploadedImages, setUploadedImages] = useState([...imgs]);
  const [thumbnailList, setThumbnailList] = useState([...imgs]);

  // Initial images from the server (could be URLs or image paths)

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const deletedImg = existingImages[index];

    dispatch(addCommunityFieldValue({
      deletedImages: [...deletedImages, deletedImg],
      existingImages: existingImages.filter((img, i) => i !== index),
    }))

    const nowDeleteImage = [...uploadedImages];
    nowDeleteImage.splice(index, 1);
    setUploadedImages(nowDeleteImage);
  };

  // Handle new image addition
  const handleAddNewImage = (files) => {
    const moreFiles = Array.from(files); // Get new files
    dispatch(addCommunityFieldValue({
      newImages: [...newImages, ...moreFiles],
    }))

    // only for display
    const nowUploadImages = [...uploadedImages];

    for (const file of files) {
      const fileName = file?.name
      setThumbnailList([...thumbnailList, fileName])
      console.log("file:", file)
      const reader = new FileReader();
      reader.onload = (e) => {
        nowUploadImages.push(e.target.result);
        setUploadedImages(nowUploadImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleAddNewImage(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };



  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Upload/Drag photos of your community</h4>
        <p className="text mb25">
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
        <label className="ud-btn btn-white">
          Browse Files
          <input
            // ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="ud-btn btn-white"
            onChange={(e) => handleAddNewImage(e.target.files)}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {uploadedImages.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <Image
                width={212}
                height={194}
                className="w-100 bdrs12 cover"
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDeleteImage(index)}
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
              <div className="d-flex align-items-center position-absolute justify-content-center" style={{top: 5, right: 10}}>
              <label 
                data-tooltip-id={`thumbnail-${index}`}
              >
                <input type="checkbox" checked={thumbnailList.indexOf(thumbnail) === index} onChange={() => dispatch(addCommunityFieldValue({thumbnail: thumbnailList[index]}))} />
              </label>
                <ReactTooltip
                  id={`thumbnail-${index}`}
                  place="top"
                  content="Set Thumbnail"
                />
              </div>
            </div>
          </div>
          ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;
