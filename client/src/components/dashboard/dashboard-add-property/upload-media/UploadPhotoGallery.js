"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { usePathname } from "next/navigation";

const UploadPhotoGallery = () => {
  const fileInputRef = useRef(null);
  const pathname = usePathname();

  // redux
  const {errors, imgs, deleteImgUrls, thumbnail} = useSelector((state)=> state.community);
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-community" ? true : false;


  const handleUpload = async (files) => {
    dispatch(addCommunityFieldValue({
      errors: {}
    }))
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      if(files.length >= 1) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/upload`, {
          method: "POST",
          credentials: "include",
          body: formData
        })
        const resData = await res.json();
        if(resData.error) {
          dispatch(addCommunityFieldValue({
            errors: resData.errors
          }))
        } else {
          const latestImags = resData.message;
          const newImages = [...imgs, ...latestImags];
          dispatch(addCommunityFieldValue({
            imgs: newImages
          }))
        }
      } else {
        return;
      }
    } catch(err) {
      console.log(err.message)
    }
  };


  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = async (index) => {

    dispatch(addCommunityFieldValue({
      errors: {}
    }))

    const newImages = [...imgs];
    const deletedImage = newImages.splice(index, 1);
    const DeletedImageUrl = deletedImage[0];
    try {
      if(!editPageValidation) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/imgdelete`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            imgUrl: DeletedImageUrl
          })
        })
        await res.json();
        dispatch(addCommunityFieldValue({
          imgUrl: newImages,
        }));
        if(DeletedImageUrl == thumbnail) {
          dispatch(addCommunityFieldValue({
            thumbnail: ""
          }))
        }
      } else {
        dispatch(addCommunityFieldValue({
          imgs: newImages,
          deleteImgUrls: [...deleteImgUrls, DeletedImageUrl]
        }));
        
        if(DeletedImageUrl == thumbnail) {
          dispatch(addCommunityFieldValue({
            thumbnail: ""
          }))
        }
      }
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
                src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/communityImgs/${imageData}`}
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
              <div className="d-flex align-items-center position-absolute justify-content-center" style={{top: 5, right: 10}}>
              <label 
                data-tooltip-id={`thumbnail-${index}`}
              >
                <input type="checkbox" checked={thumbnail == imageData} onChange={() => dispatch(addCommunityFieldValue({thumbnail: imageData}))} />
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
      <p className="text-danger fs-4">{errors?.imgs?.msg}</p>
    </>
  );
};

export default UploadPhotoGallery;
