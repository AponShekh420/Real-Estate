"use client"
import { setCredentials } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const ResetPassword = ({token}) => {

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  const userPasswordReset = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setErrors({
          confirmPassword: {
            msg: "Passwords do not match. Please make sure both fields contain the same password."
          }
        });
      return;
    }

    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/reset-password/${token}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          password
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        const {userInfo} = dataRes;
        dispatch(setCredentials(userInfo))
        setPassword("");
        setConfirmPassword("");
        router.push("/");
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
    <form className="form-style1" onSubmit={userPasswordReset} method="POST" action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/reset-password/${token}`}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">New Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.password?.msg}</p>
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Confirm Password"
          onChange={(e)=> setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.confirmPassword?.msg}</p>
      </div>
      {/* End Password */}

      <div className="d-grid mb20">
        <button className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} type="submit" disabled={loading}>
          {!loading && "Reset Password"}
          {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
        </button>
        <p className="text-danger text-capitalize text-center mt10" style={{fontSize: 15, lineHeight: 1.4}}>{errors?.login?.msg}</p>
      </div>
      {/* End submit */}
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default ResetPassword;
