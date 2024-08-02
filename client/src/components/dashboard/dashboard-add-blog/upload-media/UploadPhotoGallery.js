"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { addBlogFieldValue } from "@/redux/blogSlice";

const UploadPhotoGallery = () => {
  const fileInputRef = useRef(null);
  const pathname = usePathname();
  const [notify, setNotify] = useState("");

  // redux
  const {errors, img, deleteImgUrls} = useSelector((state)=> state.blog);
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;


  const handleUpload = async (files) => {
    
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const res = await fetch("http://localhost:5000/api/blog/upload", {
        method: "POST",
        body: formData
      })
      const {message: imgsData} = await res.json();
      console.log(imgsData)
      const newImages = imgsData;
      dispatch(addBlogFieldValue({
        img: newImages
      }));
      setNotify(newImages)
    } catch(err) {
      console.log(err.message)
    }
  };


  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = async (img) => {
    const newImages = img;
    const deletedImage = newImages;
    const DeletedImageUrl = deletedImage;
    console.log(DeletedImageUrl)
    try {
      if(!editPageValidation) {
        const res = await fetch("http://localhost:5000/api/blog/imgdelete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            imgUrl: DeletedImageUrl
          })
        })
        const deleteStatus = await res.json();
        console.log(deleteStatus)
        dispatch(addBlogFieldValue({
          img: "",
        }));
        setNotify(null)
      } else {
        dispatch(addBlogFieldValue({
          img: "",
          deleteImgUrls: [...deleteImgUrls, DeletedImageUrl]
        }));
        console.log("deleteImgs:", deleteImgUrls)
      }
      dispatch(addBlogFieldValue({
        img: ""
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
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e.target.files)}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
          {notify ? (
            <div className="col-2">
              <div className="profile-img mb20 position-relative">
                <Image
                  width={212}
                  height={194}
                  className="w-100 bdrs12 cover"
                  src={`http://localhost:5000/assets/blogs/${img}`}
                  alt={`Uploaded Image ${img}`}
                />
                <button
                  style={{ border: "none" }}
                  className="tag-del"
                  title="Delete Image"
                  onClick={() => handleDelete(img)}
                  type="button"
                  data-tooltip-id={`delete-${img}`}
                >
                  <span className="fas fa-trash-can" />
                </button>

                <ReactTooltip
                  id={`delete-${img}`}
                  place="right"
                  content="Delete Image"
                />
              </div>
            </div>
          ):  (<div></div>)}
      </div>
      <p className="text-danger fs-4">{errors?.imgs?.msg}</p>
    </>
  );
};

export default UploadPhotoGallery;
