"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});


  const userPasswordForgot = async (e) => {
    e.preventDefault();

    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        setEmail("");
        setSuccess(true)
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        setErrors(dataRes?.errors);
        if(errors?.fail) {
          toast.error(errors.fail.msg, {
            position: "top-right",
            autoClose: 1500,
          });
        }
      }
    } catch(err) {
      console.log(err.message);
    }
  }



  return (
    <>
      {success ? (
      <h5 style={{padding: "150px 0"}}>If an account with that email exists, you will receive an email with instructions to reset your password. Please check your inbox and spam folder.</h5>
      ) : (
        <>
          <div className="text-center mb40">
            <Link href="/">
              <Image
                width={138}
                height={44}
                className="mb25"
                src="/images/header-logo2.svg"
                alt="logo"
              />
            </Link>
            <h2>Forgot Password</h2>
            <p className="text">
              Reset your password and regain access to your account
            </p>
          </div>

          <form className="form-style1" onSubmit={userPasswordForgot} method="POST" action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/forgot-password`}>
            <div className="mb25">
              <label className="form-label fw600 dark-color">Email</label>
              <input
                required
                type="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
              />
              <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.email?.msg}</p>
            </div>
            {/* End email */}

            <div className="d-grid mb20">
              <button className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} type="submit" disabled={loading}>
                {!loading && "Forgot Password"}
                {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
              </button>
            </div>
            {/* End submit */}
            <p className="dark-color text-center mb0 mt10">
              Not signed up?{" "}
              <Link className="dark-color fw600" href="/register">
                Create an account.
              </Link>
            </p>
          </form>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
