"use client"

import React, { useState } from "react";
import { HashLoader, MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import StateList from "./stateList";
import CityList from "./cityList";
import AreaList from "./areaList";
import { addCityFields, removeAllCityFields } from "@/redux/citySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImUpload } from "react-icons/im";
import { addStateFields, removeStateAllFields } from "@/redux/stateSlice";
import { addAreaFields, removeAllAreaFields } from "@/redux/areaSlice";
import '@/components/dashboard/dashboard-location/style.css';


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddLocationContent = () => {
  const [cityLoading, setCityLoading] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("state");

  // redux state

  // city location
  const {stateId, active, description, abbreviation, cityName, edit: cityEdit, cityId: cityUpdateId} = useSelector((state)=> state.city);



  // area location
  const {active: areaActive, description: areaDescription, abbreviation: areaAbbreviation, areaName, stateId: stateIdForArea, cityId: cityIdForArea, edit: areaEdit, areaId: areaUpdateId} = useSelector((state)=> state.area);


  // dispatch
  const dispatch = useDispatch();

// upload new 'State', 'City' and 'Area' through these functions
  const uploadNewCity = async (e) => {
    e.preventDefault();
    try {
      setCityLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stateId: stateId._id,
          active,
          abbreviation,
          name: cityName,
          desc: description
        })
      });
      const currentCity = await res.json();
      setCityLoading(false);
      if(currentCity.msg) {
        toast.success(currentCity.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllCityFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCityFields({
          errors: currentCity.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }




  const uploadNewArea = async (e) => {
    e.preventDefault();
    try {
      setAreaLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          active: areaActive,
          abbreviation: areaAbbreviation,
          name: areaName,
          desc: areaDescription,
          stateId: stateIdForArea._id,
          cityId: cityIdForArea._id,
        })
      });
      const currentArea = await res.json();
      setAreaLoading(false);
      if(currentArea.msg) {
        toast.success(currentArea.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllAreaFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addAreaFields({
          errors: currentArea.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  // uploading new 'State', 'City' and 'Area' has ended


  const cancelAreaUpdate = () => {
    dispatch(removeAllAreaFields())
  }

  const cancelCityUpdate = ()=> {
    dispatch(removeAllCityFields())
  }


  // start here to update location

  

  // city update
  const updateExistingCity = async (e) => {
    e.preventDefault();
    try {
      setCityLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stateId: stateId._id,
          active,
          abbreviation,
          name: cityName,
          desc: description,
          cityId: cityUpdateId,
        })
      });
      const currentCity = await res.json();
      setCityLoading(false);
      if(currentCity.msg) {
        toast.success(currentCity.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllCityFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCityFields({
          errors: currentCity.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  // area update
  const updateExistingArea = async (e) => {
    e.preventDefault();
    try {
      setAreaLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          active: areaActive,
          abbreviation: areaAbbreviation,
          name: areaName,
          desc: areaDescription,
          stateId: stateIdForArea._id,
          cityId: cityIdForArea._id,
          areaId: areaUpdateId,
        })
      });
      const currentArea = await res.json();
      setAreaLoading(false);
      if(currentArea.msg) {
        toast.success(currentArea.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllAreaFields());
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addAreaFields({
          errors: currentArea.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  // here has ended to update location



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
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="title fz17 mb30">Creating City</h4>
              <div className="d-flex align-items-center gap-2 flex-row-reverse">
                <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${cityLoading ? "opacity-50" : "opacity-100"}`} disabled={cityLoading} onClick={cityEdit ? updateExistingCity : uploadNewCity}>{cityEdit ? "Update City" : "Add New City"}
                  {!cityLoading ? <ImUpload /> : <HashLoader
                    color="#ffffff"
                    loading={cityLoading}
                    cssOverride={override}
                    size={17}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  }
                </button>
                {cityEdit ? (
                  <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelCityUpdate}>
                    Cancel
                  </button>
                  ): (
                    ""
                )}
              </div>
            </div>
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
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="title fz17 mb30">Creating Area</h4>
              <div className="d-flex align-items-center gap-2 flex-row-reverse">
                <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${areaLoading ? "opacity-50" : "opacity-100"}`} disabled={areaLoading} onClick={areaEdit ? updateExistingArea : uploadNewArea}>{areaEdit ? "Update Area": "Add New Area"}
                  {!areaLoading ? <ImUpload /> : <HashLoader
                    color="#ffffff"
                    loading={areaLoading}
                    cssOverride={override}
                    size={17}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  }
                </button>
                {areaEdit ? (
                  <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelAreaUpdate}>
                    Cancel
                  </button>
                ): (
                  ""
                )}
              </div>
            </div>
            {currentTab === "area" ? <AreaList /> : <div></div> }
          </div>
        </div>
      </div>
      {/* tab loading div */}
      {/* {loading ? (
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
      ): ""} */}
      <ToastContainer/>
    </>
  );
};

export default AddLocationContent;
