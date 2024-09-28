"use client"

import React, { useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./amenities/Amenities";
import ModelMangement from "./models-data/ModelMangement"
import { useParams, usePathname, useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue, removeAllCommunityFieldValue } from "@/redux/communitySlice";
import getDataByFilter from "@/data/community/getDataByFilter";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddPropertyTabContent = ({submitBtn}) => {

  // url data 
  const pathname = usePathname();
  const {slug} = useParams();
  const router = useRouter();

  // redux
  const community = useSelector((state)=> state.community)
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-community" ? true : false;



  // add community
  const addCommunity = async (e) => {
    e.preventDefault();
    const formData = getDataByFilter(community, e);
    try {
      dispatch(addCommunityFieldValue({loading: true}));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/add`, {
        method: "POST",
        credentials: "include",
        body: formData
      })
      const dataRes = await res.json();
      dispatch(addCommunityFieldValue({loading: false}));
      if(dataRes?.msg) {
        dispatch(removeAllCommunityFieldValue());
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push(`/dashboard/edit-community/${dataRes?.data?.slug}`)
        }, 1500)
      } else {
        dispatch(addCommunityFieldValue({errors: dataRes?.errors}))
      }
      console.log(dataRes)
    } catch(err) {
      console.log(err.message)
    }
  }



  // update community
  const updateCommunity = async (e) => {
    e.preventDefault();
    const formData = getDataByFilter(community, e);
    try {
      dispatch(addCommunityFieldValue({loading: true}));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/update`, {
        method: "PUT",
        credentials: "include",
        body: formData
      })
      const dataRes = await res.json();
      dispatch(addCommunityFieldValue({loading: false}));
      if(dataRes?.msg) {
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push('/dashboard/my-communities')
        }, 1500)
      } else if(dataRes?.errors?.locationUpdate) {
        toast.error(dataRes?.errors?.locationUpdate.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        dispatch(addCommunityFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const getExistingDataToUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/single-community/${slug}`, {credentials: "include"});
      const existingCommunityData = await res.json();
      console.log(existingCommunityData)
      if(existingCommunityData?.errors?.notFound) {
        router.push('/dashboard/my-communities');
      } else {
        const {title, website, phone, address, lat, long, active, status, imgs, builtEnd, builtStart, gated, ageRestrictions, communitySize, homeTypes, maxPrice, minPrice, zip, area, city, state, _id, description, amenities, thumbnail } = existingCommunityData.data
        dispatch(addCommunityFieldValue({
          communityId: _id,
          title,
          description,
          website, 
          phone, 
          address, 
          lat, 
          long, 
          active, 
          status, 
          imgs, 
          builtEnd, 
          builtStart, 
          gated, 
          ageRestrictions, 
          communitySize, 
          homeTypes, 
          maxPrice, 
          minPrice, 
          zip, 
          areaId: area, 
          cityId: city,
          stateId: state,
          loading: false,
          amenities,
          thumbnail,
          existingImages: imgs,
        }));
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    if(editPageValidation) {
      dispatch(addCommunityFieldValue({loading: true, errors: {}}));
      getExistingDataToUpdate();
    } else {
      dispatch(removeAllCommunityFieldValue());
      dispatch(addCommunityFieldValue({loading: false}));
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
            3. Location
          </button>
          <button
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Detail
          </button>
          <button
            className="nav-link fw600"
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Amenities
          </button>
          
          {editPageValidation ? (
            <button
            className="nav-link fw600"
            id="nav-item6-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item6"
            type="button"
            role="tab"
            aria-controls="nav-item6"
            aria-selected="false"
            >
              6. Models
            </button>
          ): ""}
        </div>
      </nav>
      {/* End nav tabs */}

      <form 
        className="tab-content" 
        id="nav-tabContent" 
        onSubmit={editPageValidation ? updateCommunity : addCommunity}
        action={editPageValidation ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/add`} 
        method={editPageValidation ? "put": "post"} 
        encType="multipart/form-data"
      >
        <button type="submit" ref={submitBtn} hidden>submit</button>
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Community Description</h4>
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
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Location</h4>
            <LocationField />
          </div>
        </div>
        {/* End tab for Listing Location */}

        <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Details</h4>
            <DetailsFiled />
          </div>
        </div>
        {/* End tab for Listing Details */}

        <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item5-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Select Amenities</h4>
            <div className="row">
              <Amenities />
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}

        
        {editPageValidation ? (
            <div
            className="tab-pane fade"
            id="nav-item6"
            role="tabpanel"
            aria-labelledby="nav-item6-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Add Models</h4>
              <div className="row">
                <ModelMangement/>
              </div>
            </div>
          </div>
        ): ""}
        
      </form>
      {/* tab loading div */}
      {community?.loading ? (
        <div className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white" style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
          <MoonLoader
            color="black"
            loading={community?.loading}
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

export default AddPropertyTabContent;
