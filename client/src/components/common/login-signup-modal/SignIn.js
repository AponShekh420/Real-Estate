"use client"
import { addUserField } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const SignIn = ({modalCloseBtn}) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // redux
  const dispatch = useDispatch();

  const userLogin = async (e) => {
    e.preventDefault()
    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        localStorage.setItem('userInfo', JSON.stringify(dataRes.token));
        dispatch(addUserField(dataRes.data));
        setEmail("");
        setPassword("");
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        modalCloseBtn.current.click();
      } else {
        setErrors(dataRes?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <form className="form-style1" onSubmit={userLogin} method="POST" action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/login`}>
      <div className="mb25">
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
      {/* End email */}

      <div className="mb15">
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

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} type="submit" disabled={loading}>
          {!loading && "Sign in"}
          {loading ? (<BeatLoader color="white" loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
        </button>
        <p className="text-danger text-capitalize text-center mt10" style={{fontSize: 15, lineHeight: 1.4}}>{errors?.login?.msg}</p>
      </div>
      {/* End submit */}

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
        Not signed up?{" "}
        <Link className="dark-color fw600" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
