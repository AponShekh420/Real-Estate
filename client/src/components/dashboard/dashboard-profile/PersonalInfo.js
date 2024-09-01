"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  // redux 
  const {userInfo} = useSelector(state => state.user)
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");
  

  useEffect(()=> {
    setEmail(userInfo?.email)
    setAbout(userInfo?.about);
    setCompanyName(userInfo?.companyName);
    setTaxNumber(userInfo?.taxNumber)
    setAddress(userInfo?.address);
    setPhone(userInfo?.phone);
    setLastName(userInfo?.lastName);
    setFirstName(userInfo?.firstName);
    setLoading(false)
  }, [userInfo])
  

  return (
    <form className="form-style1">
      <div className="row">
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark" disabled={loading}>
              Update Profile
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;
