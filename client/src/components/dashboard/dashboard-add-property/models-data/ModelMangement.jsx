import { useState } from "react";
import SingleModel from "./SingleModel";
import UploadModelImg from "./UploadModelImg";
import classes from './communityModel.module.css'
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { IoIosAddCircleOutline } from "react-icons/io";
import { addModelFields, removeModelAllFields } from "@/redux/modelSlice";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const ModelMangement = () => {
  const [loading, setLoading] = useState(false);

  // redux state
  const {communityId} = useSelector((state)=> state.community)
  const {CMTName, desc, uploadedImage, edit, CMTId, oldImgUrl, uploadedImageChanged} = useSelector((state)=> state.model);

  // redux dispatch for action
  const dispatch = useDispatch();

  const addModel = async (e) => {
    e.preventDefault();
    dispatch(addModelFields({
      errors: {}
    }));
    if(uploadedImage == null) {
      console.log("image null")
      dispatch(addModelFields({
        errors: {
          img: {
            msg: "Please select the image!"
          }
        }
      }))
      return;
    }
    const formData = new FormData(e.target);
    formData.set("CMTName", CMTName);
    formData.set("desc", desc);
    formData.set("communityId", communityId);

    const manualData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CMTName: CMTName,
        communityId: communityId,
        desc: desc,
        uploadedImageChanged: false,
      })
    }
    
    const multipartDataWithFile = {
      method: "POST",
      body: formData
    }

    const bodyData = uploadedImageChanged ? multipartDataWithFile : manualData;
    console.log(bodyData)
    try {
      setLoading(true);
      // console.log("img:", img)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/add`, bodyData);
      const currentData = await res.json();
      setLoading(false)
      if(currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });

        dispatch(addModelFields({
          CMTName: "",
          desc: "",
          uploadedImage: null,
          newDataNotify: currentData,
        }))
      } else {
        toast.error("There are somthing is warn, please try again!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
      console.log(currentData)
    } catch(err) {
      console.log(err.message)
    }
  }


  const cancelModelUpdate = () => {
    dispatch(removeModelAllFields());
  }


  // update the model
  const updateModel = async (e) => {
    e.preventDefault();
    dispatch(addModelFields({
      errors: {}
    }));
    if(uploadedImage == null) {
      console.log("image null")
      dispatch(addModelFields({
        errors: {
          img: {
            msg: "Please select the image!"
          }
        }
      }))
      return;
    }
    const formData = new FormData(e.target);
    formData.set("CMTName", CMTName);
    formData.set("desc", desc);
    formData.set("uploadedImageChanged", uploadedImageChanged);
    formData.set("oldImgUrl", oldImgUrl);
    formData.set("uploadedImage", uploadedImage);
    formData.set("CMTId", CMTId);

    const manualData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CMTName: CMTName,
        desc: desc,
        CMTId: CMTId,
        uploadedImageChanged: false
      })
    }

    const multipartDataWithFile = {
      method: "PUT",
      body: formData
    }

    const bodyData = uploadedImageChanged ? multipartDataWithFile : manualData;

    try {
      setLoading(true);
      // console.log("img:", img)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/update`, bodyData);
      const currentData = await res.json();
      setLoading(false)
      if(currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });

        dispatch(removeModelAllFields());
        dispatch(addModelFields({
          newDataNotify: currentData,
        }));
      } else {
        toast.error("There are somthing is warn, please try again!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
      console.log(currentData)
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <div>
      <SingleModel />

      <div className={`ps-widget ${classes.boxBg} bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative`}>
        <h4 className="title fz17 mb30">Add New Model</h4>
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Upload photos of your community model</h4>
          <form className="form-style1" 
            onSubmit={edit ? updateModel : addModel} 
            action={edit ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/update` : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/add`} 
            method={edit ? "put": "post"} 
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-lg-12">
                <UploadModelImg />
              </div>
            </div>
            {/* End col-12 */}

            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Title
                  </label>
                  <input
                    required
                    onChange={(e)=> dispatch(addModelFields({
                      CMTName: e.target.value
                    }))}
                    type="text"
                    className="form-control"
                    placeholder="Type The Title Name"
                    value={CMTName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Description
                  </label>
                  <textarea
                    required
                    onChange={(e)=> dispatch(addModelFields({
                      desc: e.target.value
                    }))}
                    type="text"
                    className={`form-control ${classes.modelDes}` }
                    placeholder="Write Description For Model"
                    value={desc}
                  >
                  </textarea>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30 d-flex justify-content-end gap-2">
                  <button className={`${classes.addModelBtn} bg-white rounded-2 d-flex gap-2 justify-content-center align-items-center ${loading? "opacity-50" : "opacity-100"}`} type="submit" disabled={loading} style={{border: "2px solid green", outline: "none", color: "green", fontWeight: 600}}>
                    {edit ? "Update Model": 'Add Model'}
                    {!loading ? <IoIosAddCircleOutline size={18}/> : <HashLoader
                      color="#ffffff"
                      loading={loading}
                      cssOverride={override}
                      size={18}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    }
                  </button>
                  {edit ? (
                  <button className={`${classes.cancelBtn} btn rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} style={{border: "2px solid red", color: "red", fontWeight: 600}} onClick={cancelModelUpdate}>
                      Cancel
                    </button>
                  ): (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* End .row */}
          </form>
        </div>
      </div>
      <ToastContainer containerId="containerA"/>
    </div>
  );
}

export default ModelMangement;