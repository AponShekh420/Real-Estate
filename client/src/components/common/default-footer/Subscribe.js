"use client"
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Subscribe = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const subscribeHandler = async () => {
    setSuccessMsg("");
    setErrors({});
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/subscribe/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        setSuccessMsg(dataRes?.msg)
        setEmail("")
      } else {
        setErrors(dataRes?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <div className="mailchimp-widget mb-4 mb-lg-5">
      <h6 className="title text-white mb20">Keep Yourself Up to Date</h6>
      <div className="mailchimp-style1">
        <input type="email" className="form-control" placeholder="Your Email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <button type="submit" className={`d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading} onClick={subscribeHandler}>
        {!loading && "Subscribe"}
        {loading && (<BeatLoader color="white" size={20} loading={loading} />)}
        </button>
      </div>
      <div className="col-md-12">
        <div className="mt25">
          {successMsg && (
            <div className="alert alert-success text-center" role="alert">
              {successMsg}
            </div>)}
          {errors?.email && (
            <div className="alert alert-danger text-center" role="alert">
              {errors?.email?.msg}
            </div>)}
          {errors?.exist && (
          <div className="alert alert-danger text-center" role="alert">
            {errors?.exist?.msg}
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
