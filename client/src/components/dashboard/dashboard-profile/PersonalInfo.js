"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBox from "./ProfileBox";
import { setCredentials } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const PersonalInfo = () => {
  // redux 
  const {userInfo} = useSelector(state => state.user);
  const dispatch = useDispatch();


  // react state
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageChanged, setUploadedImageChanged] = useState(false);
  const [oldImgUrl, setOldImgUrl] = useState("");
  
  const [update, setUpdate] = useState(false);


  useEffect(()=> {
    setEmail(userInfo?.email)
    setAbout(userInfo?.about);
    setCompanyName(userInfo?.companyName);
    setTaxNumber(userInfo?.taxNumber)
    setAddress(userInfo?.address);
    setPhone(userInfo?.phone);
    setLastName(userInfo?.lastName);
    setFirstName(userInfo?.firstName);
    setLoading(false);
    setUploadedImage(userInfo?.avatar);
    setOldImgUrl(userInfo?.avatar);
    setUploadedImageChanged(false);
  }, [userInfo, update])
  

  // update the model
  const updateProfile = async (e) => {
    e.preventDefault();
    setErrors({})
    if(uploadedImage == null) {
      setErrors({
        img: {
          msg: "Please select the image!"
        }
      })
      return;
    }
    const formData = new FormData(e.target);
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("address", address);
    formData.set("companyName", companyName);
    formData.set("taxNumber", taxNumber);
    formData.set("phone", phone);
    formData.set("about", about);
    formData.set("uploadedImageChanged", uploadedImageChanged);
    formData.set("oldImgUrl", oldImgUrl);
    formData.set("uploadedImage", uploadedImage);

    const manualData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        companyName,
        taxNumber,
        phone,
        about,
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/profile-update`, bodyData);
      const currentData = await res.json();
      setLoading(false)
      if(currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(setCredentials(currentData.user))
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
    <form className="form-style1"
      onSubmit={updateProfile} 
      action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/profile-update`} 
      method={"put"} 
      encType="multipart/form-data"
    >
      <div className="row">
      <div className="col-12">
        <ProfileBox userInfo={userInfo} errors={errors} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} uploadedImageChanged={uploadedImageChanged} setUploadedImageChanged={setUploadedImageChanged} oldImgUrl={oldImgUrl}/>
      </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              placeholder="Your Name"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              disabled={!update}
              type="number"
              className="form-control"
              placeholder="Your Name"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              First Name
            </label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Last Name
            </label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Company Name
            </label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Tax Number
            </label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              About me
            </label>
            <textarea
              disabled={!update}
              cols={30}
              rows={4}
              placeholder="There are many variations of passages."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end gap-2 d-flex justify-content-end">
            {update && (
              <button className={`ud-btn btn-outline-danger ${loading ? "opacity-50": "opacity-100"}`} disabled={loading} onClick={() => setUpdate(false)}>
                Cancel
                <i class="fa-regular fa-xmark" style={{rotate: "45deg"}}></i>
              </button>
            )}
            {update && (
              <button type="submit" className={`ud-btn btn-dark d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading}>
                {!loading && "Update Profile"}
                {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
              </button>
            )}
            {!update && (
              <button className="ud-btn btn-dark" disabled={loading} onClick={()=> setUpdate(true)}>
                Edit Profile
                <i class="fa-regular fa-pen-to-square" style={{rotate: "45deg"}}></i>
              </button>
            )}
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;
