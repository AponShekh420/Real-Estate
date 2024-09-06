"use client"
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

const Form = () => {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/contact/send`, {
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
    <form
      className="form-style1"
      action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/contact/send`}
      method="post"
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p className="text-danger">{errors?.email?.msg}</p>
          </div>
        </div>
        {/* End .col-lg-12 */}
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Phone (optional)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <p className="text-danger">{errors?.phone?.msg}</p>
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              Message
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder="There are many variations of passages."
              defaultValue={""}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <p className="text-danger">{errors?.message?.msg}</p>
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="d-grid">
            <button type="submit" className={`ud-btn btn-thm w-100 d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading}>
              {!loading && "Submit a Tour Request"}
              {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
            </button>
          </div>

          <div className="mt25">
            {successMsg && (
              <div className="alert alert-success text-center" role="alert">
                {successMsg}
              </div>)}
            {errors?.fail && (
            <div className="alert alert-danger text-center" role="alert">
              {errors?.fail?.msg}
            </div>)}
          </div>
        </div>
        {/* End .col-12 */}
      </div>
    </form>
  );
};

export default Form;
