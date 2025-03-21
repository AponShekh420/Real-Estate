"use client"

import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImUpload } from "react-icons/im";
import '@/components/dashboard/dashboard-location/style.css';
import Catagory from "./parentsCatagory";
import { addCatagoryFields, removeCatagoryAllFields } from "@/redux/catagorySlice";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AddCatagoryContent = () => {
  const [catagoryLoading, setCatagoryLoading] = useState(false);

  // redux state
  const {catagoryName, edit: catagoryEdit, catagoryId: catagoryUpdateId} = useSelector((state)=> state.catagory);
  
  const dispatch = useDispatch();

  const uploadNewCatagory = async (e) => {
    e.preventDefault();
    try {
      setCatagoryLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/add`, {
        method: "POST",
        credentials: "include",
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


  const cancelCatagoryUpdate = () => {
    dispatch(removeCatagoryAllFields())
  }


  // catagory udpate
  const updateExistingCatagory = async (e) => {
    e.preventDefault();
    try {
      setCatagoryLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/update`, {
        method: "PUT",
        credentials: "include",
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
            Category
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
              <h4 className="title fz17 mb30">Creating Category</h4>
              <div className="d-flex align-items-center gap-2 flex-row-reverse">
                <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${catagoryLoading ? "opacity-50" : "opacity-100"}`} disabled={catagoryLoading} onClick={catagoryEdit ? updateExistingCatagory : uploadNewCatagory}>{catagoryEdit ? "Update Category": "Add New Category"}
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
      </div>
      <ToastContainer/>
    </>
  );
};

export default AddCatagoryContent;
