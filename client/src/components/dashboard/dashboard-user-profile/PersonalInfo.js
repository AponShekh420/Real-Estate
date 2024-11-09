"use client"
import React, { useEffect, useState } from "react";
import ProfileBox from "./ProfileBox";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useRouter, useParams } from "next/navigation";
import Select from 'react-select'

const userRoleList = [
  { value: "viewer", label: "viewer" },
  { value: "admin", label: "admin" },
  { value: "contributor", label: "contributor" },
];


const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};




const PersonalInfo = () => {
  const {id} = useParams();
  const router = useRouter();


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
  const [role, setRole] = useState("");
  
  const [update, setUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState({});


  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/get/${id}`, {
        credentials: "include",
      })
      const dataRes = await res.json();
      if(dataRes.msg) {
          setUserInfo(dataRes?.user)
          setEmail(dataRes?.user?.email)
          setAbout(dataRes?.user?.about || "");
          setCompanyName(dataRes?.user?.companyName || "");
          setTaxNumber(dataRes?.user?.taxNumber || "")
          setAddress(dataRes?.user?.address || "");
          setPhone(dataRes?.user?.phone || "");
          setLastName(dataRes?.user?.lastName);
          setFirstName(dataRes?.user?.firstName);
          setLoading(false);
          setUploadedImage(dataRes?.user?.avatar);
          setOldImgUrl(dataRes?.user?.avatar);
          setUploadedImageChanged(false);
          setRole(dataRes?.user?.role);
      } else {
        toast.error("Something went wrong on our end. Please try again later.", {
          position: "top-right",
          autoClose: 1500,
        });
        router.push("/dashboard/users");
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  useEffect(()=> {
    getUser()
  }, [update])
  

  // update the model
  const updateProfile = async (e) => {
    e.preventDefault();
    
    setErrors({})
    
    const formData = new FormData(e.target);
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("address", address);
    formData.set("companyName", companyName);
    formData.set("taxNumber", taxNumber);
    formData.set("phone", phone);
    formData.set("id", id);
    formData.set("role", role);
    formData.set("about", about);
    formData.set("uploadedImageChanged", uploadedImageChanged);
    formData.set("oldImgUrl", oldImgUrl);
    formData.set("uploadedImage", uploadedImage);

    const manualData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        companyName,
        taxNumber,
        phone,
        id,
        role,
        about,
        uploadedImageChanged,
        uploadedImage
      })
    }

    const multipartDataWithFile = {
      method: "PUT",
      body: formData,
      credentials: "include",
    }

    const bodyData = (uploadedImageChanged && uploadedImage) ? multipartDataWithFile : manualData;


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
        setUpdate(false)
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
        <ProfileBox userInfo={userInfo} errors={errors} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} uploadedImageChanged={uploadedImageChanged} setUploadedImageChanged={setUploadedImageChanged} oldImgUrl={oldImgUrl} setOldImgUrl={setOldImgUrl} setUpdate={setUpdate} update={update}/>
      </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Role
            </label>
            <div className="location-area">
              <Select
                instanceId="sdfdsfatwe"
                id="sdfdsfatwe"
                defaultValue={[{value: role, label: role}]}
                name="colors"
                options={userRoleList}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                isDisabled={!update}
                onChange={(e)=> setRole(e.value)}
                value={{value: role, label: role}}
              />
            </div>
          </div>
        </div>



        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              disabled={!update}
              type="text"
              className="form-control"
              placeholder="Your Phone Number"
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
              placeholder="Your First Name"
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
              placeholder="Your Last Name"
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
              placeholder="Your Company Name"
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
              type="number"
              className="form-control"
              placeholder="Your Tax Number"
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
              placeholder="Your Address"
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
