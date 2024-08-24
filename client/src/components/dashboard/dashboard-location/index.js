"use client"

import React, { useState } from "react";
import StateList from "./stateList";
import CityList from "./cityList";
import AreaList from "./areaList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@/components/dashboard/dashboard-location/style.css';


const AddLocationContent = () => {
  const [currentTab, setCurrentTab] = useState("state");


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
            onClick={() => setCurrentTab("state")}
          >
            1. State
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
            onClick={()=> setCurrentTab("city")}
          >
            2. City
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
            onClick={() => setCurrentTab("area")}
          >
            3. Area
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
            {currentTab === "state" ? <StateList/> : <div></div> }
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            {currentTab === "city" ? <CityList /> : <div></div> }
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            {currentTab === "area" ? <AreaList /> : <div></div> }
          </div>
        </div>
      </div>
      
      <ToastContainer/>
    </>
  );
};

export default AddLocationContent;
