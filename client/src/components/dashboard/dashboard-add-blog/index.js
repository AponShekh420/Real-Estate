"use client"

import React, { useEffect } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./meta-data";
import { addBlogFieldValue, removeAllBlogFieldValue } from "@/redux/blogSlice";
import getFormData from "@/data/blog/getFormData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errors } from "jose";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddBlogTabContent = ({submitBtn}) => {
  const pathname = usePathname();
  const {loading, errors, uploadedImageChanged, uploadedImage} = useSelector(state=> state.blog)

  // url data 
  const {slug} = useParams();
  const router = useRouter();

  // redux
  const blog = useSelector((state)=> state.blog)
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;


  const addBlog = async (e) => {
    e.preventDefault();

    if(uploadedImageChanged && (uploadedImage == null)) {
      dispatch(addBlogFieldValue({
        errors: {
          ...errors,
          img: {
            msg: "The image is required*"
          }
        }
      }));
      toast.error("The media image is required*", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    
    const formData = getFormData(blog, e);
    try {
      dispatch(addBlogFieldValue({
        loading: true
      }))
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/add`, {
        method: "POST",
        credentials: "include",
        body: formData
      })
      const dataRes = await res.json();
      dispatch(addBlogFieldValue({
        loading: false
      }))
      if(dataRes.msg) {
        dispatch(removeAllBlogFieldValue());
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push(`/dashboard/edit-blog/${dataRes.data.slug}`)
        }, 1500)
      } else {
        dispatch(addBlogFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  const updateBlog = async (e) => {
    e.preventDefault();

    // remove existing error
    dispatch(addBlogFieldValue({
      errors: {}
    }))


    // check the image error
    if(uploadedImageChanged && (uploadedImage == null)) {
      dispatch(addBlogFieldValue({
        errors: {
          ...errors,
          img: {
            msg: "The image is required*"
          }
        }
      }));
      toast.error("The media image is required*", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    const formData = getFormData(blog, e);
    try {
      dispatch(addBlogFieldValue({
        loading: true
      }))
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/update`, {
        method: "PUT",
        credentials: "include",
        body: formData
      })
      const dataRes = await res.json();
      dispatch(addBlogFieldValue({
        loading: false
      }))
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push('/dashboard/blogs')
        }, 1500)
      } else if(dataRes.errors.img) {
        toast.error(dataRes.errors.img.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        dispatch(addBlogFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const getExistingDataToUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/single-blog/${slug}`, {credentials: "include"});
      const existingBlogData = await res.json();
      console.log(existingBlogData)
      if(existingBlogData?.errors?.notFound) {
        router.push('/dashboard/blogs');
      } else {
        const {title, active, img, subcatagory, catagory, _id, desc, metaTitle, metaDesc} = existingBlogData.data
        dispatch(addBlogFieldValue({
          blogId: _id,
          title,
          desc,
          active, 
          img,
          subcatagoryId: subcatagory,
          catagoryId: catagory,
          loading: false,
          metaTitle,
          metaDesc,
          uploadedImage: img,
          oldImgUrl: img,
          uploadedImageChanged: false,
        }));
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    if(editPageValidation) {
      dispatch(addBlogFieldValue({loading: true}));
      getExistingDataToUpdate();
    } else {
      dispatch(removeAllBlogFieldValue());
      dispatch(addBlogFieldValue({loading: false}));
    }
  }, [])
  
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Description
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            2. Media
          </button>
          <button
            className="nav-link fw600"
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            3. Onpage-SEO
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <form 
        className="tab-content" 
        id="nav-tabContent"
        onSubmit={editPageValidation ? updateBlog : addBlog}
        action={editPageValidation ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/add`} 
        method={editPageValidation ? "put": "post"} 
        encType="multipart/form-data"
      >
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Blog Description</h4>
            <PropertyDescription />
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <UploadMedia />
        </div>
        {/* End tab for Upload photos of your property */}
        
        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpane3"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Meta data for SEO</h4>
            <MetaData />
          </div>
        </div>
        {/* End tab for Property Description */}

        {/* hiddne submit btn */}
        <button type="submit" ref={submitBtn} hidden>submit</button>
      </form>
      {/* tab loading div */}
      {loading ? (
        <div className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white" style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
          <MoonLoader
            color="black"
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ): ""}
    </>
  );
};

export default AddBlogTabContent;
