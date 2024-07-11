import { useState } from "react";
import SingleModel from "./SingleModel";
import UploadModelImg from "./UploadModelImg";
import classes from './communityModel.module.css'
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { IoIosAddCircleOutline } from "react-icons/io";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const ModelMangement = () => {
  const {communityId} = useSelector((state)=> state.community)
  const [CMTName, setCMTName] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newDataNotify, setNewDataNotify] = useState(null)

  const addModel = async (e) => {
    e.preventDefault();
    if(uploadedImage == null) {
      toast.error("Please select the image!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    const formData = new FormData(e.target);
    formData.set("CMTName", CMTName);
    formData.set("desc", desc);
    formData.set("communityId", communityId);
    try {
      console.log("hello1")
      setLoading(true);
      // console.log("img:", img)
      const res = await fetch("http://localhost:5000/api/models/add", {
        method: "POST",
        body: formData
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setCMTName("");
        setDesc("");
        setUploadedImage(null);
        setNewDataNotify(currentData)
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
      <SingleModel newDataNotify={newDataNotify} setNewDataNotify={setNewDataNotify}/>

      <div className={`ps-widget ${classes.boxBg} bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative`}>
        <h4 className="title fz17 mb30">Add New Model</h4>
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Upload photos of your property</h4>
          <form className="form-style1" 
            onSubmit={addModel} 
            action="http://localhost:5000/api/models/add" 
            method="post" 
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-lg-12">
                <UploadModelImg uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
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
                    onChange={(e)=> setCMTName(e.target.value)}
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
                    onChange={(e)=> setDesc(e.target.value)}
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
                <div className="mb30 d-flex justify-content-end">
                  <button className={`${classes.addModelBtn} border border-dark bg-white rounded-2 d-flex gap-2 justify-content-center align-items-center ${loading? "opacity-50" : "opacity-100"}`} type="submit" disabled={loading}>
                    Add Model
                    {!loading ? <IoIosAddCircleOutline /> : <HashLoader
                      color="#ffffff"
                      loading={loading}
                      cssOverride={override}
                      size={17}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    }
                  </button>
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