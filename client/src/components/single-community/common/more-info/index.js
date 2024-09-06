"use client"
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import SingleAgentInfo from "./SingleAgentInfo";

const InfoWithForm = ({data}) => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");




  const submitHandler = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMsg("");
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/more-info/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          communityTitle: data?.title,
          communityUrl: data?.slug
        })
      })
      const resData = await res.json();
      setLoading(false);
      if(resData?.msg) {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSuccessMsg(resData?.msg);
      } else {
        setErrors(resData.errors);
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  

  return (
    <>
      <SingleAgentInfo />

      <div className="row">
        <div className="col-md-12">
          <form 
            className="form-style1 row"
            action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/more-info/send`}
            method="post"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <p className="text-danger">{errors?.name?.msg}</p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <p className="text-danger">{errors?.phone?.msg}</p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-12">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <p className="text-danger">{errors?.email?.msg}</p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-md-12">
              <div className="mb10">
                <label className="heading-color ff-heading fw600 mb10">
                  Message
                </label>
                <textarea
                  cols={30}
                  rows={4}
                  placeholder="Hello, I am interested in [Renovated apartment at last floor]"
                  defaultValue={""}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <p className="text-danger">{errors?.message?.msg}</p>
              </div>
            </div>
            {/* End .col */}

            <div className="btn-area mt20">
              <button type="submit" className={`ud-btn btn-white2 d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading}>
                {!loading && "Request Information"}
                {loading ? (<BeatLoader color="#000000" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
              </button>
            </div>

            <div className="mt25 col-12">
              {successMsg && (
                <div className="alert alert-success text-center" role="alert">
                  {successMsg}
                </div>)}
              {errors?.fail && (
                <div className="alert alert-danger text-center" role="alert">
                  {errors?.fail?.msg}
                </div>)}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InfoWithForm;
