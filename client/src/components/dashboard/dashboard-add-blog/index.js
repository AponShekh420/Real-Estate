"use client"

import React from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import { usePathname } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useSelector } from "react-redux";
import MetaData from "./meta-data";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddBlogTabContent = () => {
  const pathname = usePathname();
  const {loading} = useSelector(state=> state.blog)

  // const editPageValidation = pathname.split("/")[2] === "edit-community" ? true : false;
  
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

      <div className="tab-content" id="nav-tabContent">
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

      </div>
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
