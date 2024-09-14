"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { addBlogFieldValue } from "@/redux/blogSlice";
import { MoonLoader } from "react-spinners";


const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "red",
};





const UploadPhotoGallery = () => {
  const fileInputRef = useRef(null);
  const pathname = usePathname();
  const [notify, setNotify] = useState("");
  const [loading, setLoading] = useState(false)
  // redux
  const {errors, img, deleteImgUrls} = useSelector((state)=> state.blog);
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;


  const handleUpload = async (file) => {
    dispatch(addBlogFieldValue({
      img: "",
      errors: {}
    }))
    const formData = new FormData();
    formData.append('file', file);

    console.log("fileData", file);
    console.log("FormData", formData);
    try {
      if(file) {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/upload`, {
          method: "POST",
          credentials: "include",
          body: formData
        })
        const resData = await res.json();
        setLoading(false);
        if(resData.errors) {
          dispatch(addBlogFieldValue({
            errors: resData?.errors
          }))
          setNotify(null);
        } else {
          const newImages = resData.message;
          dispatch(addBlogFieldValue({
            img: newImages
          }));
          setNotify(newImages)
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

  const handleDelete = async (img) => {
    dispatch(addBlogFieldValue({
      errors: {}
    }))
    
    const newImages = img;
    const deletedImage = newImages;
    const DeletedImageUrl = deletedImage;
    console.log(DeletedImageUrl)
    try {
      if(!editPageValidation) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/imgdelete`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            imgUrl: DeletedImageUrl
          })
        })
        const deleteStatus = await res.json();
        dispatch(addBlogFieldValue({
          img: "",
        }));
        setNotify(null)
      } else {
        dispatch(addBlogFieldValue({
          img: "",
          deleteImgUrls: [...deleteImgUrls, DeletedImageUrl]
        }));
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
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30"
      >
        
        <div className="icon mb30" style={{visibility: loading ? "hidden" : "visible"}}>
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10" style={{visibility: loading ? "hidden" : "visible"}}>Upload/Drag photos of your property</h4>
        <p className="text mb25" style={{visibility: loading ? "hidden" : "visible"}}>
          Photos must be JPEG, JPG or PNG format
        </p>
        <label className="ud-btn btn-white" style={{visibility: loading ? "hidden" : "visible"}}>
          Browse Files
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>

        <div className="w-100 h-100 top-0 d-flex align-items-center justify-content-center position-absolute" style={{zIndex: loading ? "100" : "-2000", display: loading ? "flex": "none"}}>
          <MoonLoader
            color="black"
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        {/* Display uploaded images */}
        {img ? (
          <div className="profile-box w-100 h-100 position-absolute top-0" style={{zIndex: !img ? "-10" : ""}}>
            <div className="w-100 h-100">
              <div className="profile-img w-100 h-100">
                <Image
                  width={100}
                  height={100}
                  className="w-100 h-100 bdrs12 cover"
                  src={img}
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
          </div>):  (<div></div>)}
      </div>
      <p className="text-danger fs-4">{errors?.img?.msg}</p>
    </>
  );
};

export default UploadPhotoGallery;
