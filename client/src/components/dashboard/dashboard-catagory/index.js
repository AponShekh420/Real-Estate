"use client"

import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImUpload } from "react-icons/im";
import '@/components/dashboard/dashboard-location/style.css';
import Catagory from "./parentsCatagory";
import SubCatagory from "./subCatagory";
import { addSubcatagoryFields, removeAllSubcatagoryFields } from "@/redux/subCatagorySlice";
import { addCatagoryFields, removeCatagoryAllFields } from "@/redux/catagorySlice";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddCatagoryContent = () => {
  const [catagoryLoading, setCatagoryLoading] = useState(false);
  const [subcatagoryLoading, setSubcatagoryLoading] = useState(false);

  // redux state
  const {catagoryId, subcatagoryName, edit: subcatagoryEdit, subcatagoryId: subcatagoryUpdateId} = useSelector((state)=> state.subcatagory);

  const {catagoryName, edit: catagoryEdit, catagoryId: catagoryUpdateId} = useSelector((state)=> state.catagory);
  
  
  const dispatch = useDispatch();

// upload new 'State', 'City' and 'Area' through these functions
  const uploadNewSubcatagory = async (e) => {
    e.preventDefault();
    try {
      setSubcatagoryLoading(true);
      const res = await fetch("http://localhost:5000/api/subcatagory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catagoryId: catagoryId._id,
          name: subcatagoryName,
        })
      });
      const currentSubcatagory = await res.json();
      setSubcatagoryLoading(false);
      if(currentSubcatagory.msg) {
        toast.success(currentSubcatagory.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllSubcatagoryFields())
        dispatch(addCatagoryFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addSubcatagoryFields({
          errors: currentSubcatagory.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const uploadNewCatagory = async (e) => {
    e.preventDefault();
    try {
      setCatagoryLoading(true);
      const res = await fetch("http://localhost:5000/api/catagory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: catagoryName,
        })
      });
      const currentCatagory = await res.json();
      setCatagoryLoading(false);
      if(currentCatagory.msg) {
        toast.success(currentCatagory.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeCatagoryAllFields());
        dispatch(addCatagoryFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCatagoryFields({
          errors: currentCatagory.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  // uploading new 'catagory' and 'subcatagory' has ended


  const cancelCatagoryUpdate = () => {
    dispatch(removeCatagoryAllFields())
  }

  const cancelSubcatagoryUpdate = ()=> {
    dispatch(removeAllSubcatagoryFields())
  }


  // start here to update catagory and subcatagory

  // catagory udpate
  const updateExistingCatagory = async (e) => {
    e.preventDefault();
    try {
      setCatagoryLoading(true);
      const res = await fetch("http://localhost:5000/api/catagory/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: catagoryName,
          catagoryId: catagoryUpdateId
        })
      });
      const currentCatagory = await res.json();
      setCatagoryLoading(false);
      if(currentCatagory.msg) {
        toast.success(currentCatagory.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeCatagoryAllFields());
        dispatch(addCatagoryFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addCatagoryFields({
          errors: currentCatagory.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  

  // subcatagory update
  const updateExistingSubcatagory = async (e) => {
    e.preventDefault();
    try {
      setSubcatagoryLoading(true);
      const res = await fetch("http://localhost:5000/api/subcatagory/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catagoryId: catagoryId._id,
          name: subcatagoryName,
          subcatagoryId: subcatagoryUpdateId,
        })
      });
      const currentSubcatagory = await res.json();
      setSubcatagoryLoading(false);
      if(currentSubcatagory.msg) {
        toast.success(currentSubcatagory.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(removeAllSubcatagoryFields());
        dispatch(addCatagoryFields({
          notify: Math.random(),
        }))
      } else {
        dispatch(addSubcatagoryFields({
          errors: currentSubcatagory.errors,
        }))
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  // here has ended to update catagory and subcatagory



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
            1. Catagory
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
            2. Subcatagory
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
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="title fz17 mb30">Creating Parent Catagory</h4>
              <div className="d-flex align-items-center gap-2 flex-row-reverse">
                <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${catagoryLoading ? "opacity-50" : "opacity-100"}`} disabled={catagoryLoading} onClick={catagoryEdit ? updateExistingCatagory : uploadNewCatagory}>{catagoryEdit ? "Update Catagory": "Add New Catagory"}
                  {!catagoryLoading ? <ImUpload /> : <HashLoader
                    color="#ffffff"
                    loading={catagoryLoading}
                    cssOverride={override}
                    size={17}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  }
                </button>
                {catagoryEdit ? (
                  <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelCatagoryUpdate}>
                    Cancel
                  </button>
                ): (
                  ""
                )}
              </div>
            </div>
            <Catagory />
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
              <h4 className="title fz17 mb30">Creating Subcatagory</h4>
              <div className="d-flex align-items-center gap-2 flex-row-reverse">
                <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${subcatagoryLoading ? "opacity-50" : "opacity-100"}`} disabled={subcatagoryLoading} onClick={subcatagoryEdit ? updateExistingSubcatagory : uploadNewSubcatagory}>{subcatagoryEdit ? "Update Subcatagory" : "Add New Subcatagory"}
                  {!subcatagoryLoading ? <ImUpload /> : <HashLoader
                    color="#ffffff"
                    loading={subcatagoryLoading}
                    cssOverride={override}
                    size={17}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  }
                </button>
                {subcatagoryEdit ? (
                  <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelSubcatagoryUpdate}>
                    Cancel
                  </button>
                  ): (
                    ""
                )}
              </div>
            </div>
            <SubCatagory />
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

export default AddCatagoryContent;
