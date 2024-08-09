'use client'

import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";


const SignUp = ({signInTabBtn}) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const userRegister = async (e) => {
    e.preventDefault()
    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        console.log(dataRes.msg)
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        signInTabBtn.current.click();
      } else {
        setErrors(dataRes?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <form className="form-style1" onSubmit={userRegister} method="POST" action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/register`}>
      <div className={`${errors ? "md17" : "mb25"}`}>
        <label className="form-label fw600 dark-color">First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          onChange={(e)=> setFirstName(e.target.value)}
          value={firstName}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.firstName?.msg}</p>
      </div>
      {/* End First Name */}

      <div className={`${errors ? "md17" : "mb25"}`}>
        <label className="form-label fw600 dark-color">Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter last Name"
          onChange={(e)=> setLastName(e.target.value)}
          value={lastName}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.lastName?.msg}</p>
      </div>
      {/* End Last Name */}

      <div className={`${errors ? "md17" : "mb25"}`}>
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.email?.msg}</p>
      </div>
      {/* End Email */}

      <div className={`${errors ? "md17" : "mb25"}`}>
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.password?.msg}</p>
      </div>
      {/* End Password */}

      <div className="d-grid mb20">
        <button className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} type="submit" disabled={loading}>
          {!loading && "Create account"}
          {loading ? (<BeatLoader color="white" loading={loading} />) : (<i className="fal fa-arrow-right-long"/>)}
        </button>
      </div>
      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div>
      <p className="dark-color text-center mb0 mt10">
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
