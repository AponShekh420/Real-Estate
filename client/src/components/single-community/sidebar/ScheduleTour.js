"use client"
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

const ScheduleTour = ({data}) => {
  const [time, setTime] = useState("");
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/schedule/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          time,
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
        setTime("");
        setSuccessMsg(resData?.msg);
      } else {
        setErrors(resData.errors);
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  

  return (
    <div className="ps-navtab">
      <div className="tab-content" id="pills-tabContent">
        <form
          className="form-style1"
          action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/schedule/send`}
          method="post"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="mb20">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
                <p className="text-danger">{errors?.time?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-lg-12">
              <div className="mb20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <p className="text-danger">{errors?.name?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-lg-12">
              <div className="mb20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <p className="text-danger">{errors?.phone?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="mb20">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <p className="text-danger">{errors?.email?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="mb10">
                <textarea
                  cols={30}
                  rows={4}
                  placeholder="Enter Your Messages"
                  defaultValue={""}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <p className="text-danger">{errors?.message?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="d-grid">
                <button type="submit" className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading}>
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
      </div>
    </div>
  );
};

export default ScheduleTour;
