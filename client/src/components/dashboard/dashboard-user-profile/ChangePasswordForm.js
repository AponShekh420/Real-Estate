"use client"
import changePassword from "@/lib/changePassword";
import { logout } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  const passwordHandler = async (e) => {
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
      setErrors({});
      setLoading(true);
      const res = await changePassword(password, oldPassword);
      setLoading(false);
      if(res?.msg) {
        setPassword("");
        setConfirmPassword("");
        setOldPassword("");
        dispatch(logout());
        router.push("/");
      } else {
        setErrors(res?.errors);
        if(res?.errors?.login) {
          toast.error(res?.errors?.login?.msg, {
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
    <form className="form-style1" onSubmit={passwordHandler} action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/change-password`} method="PATCH">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Your Name"
              onChange={(e)=> setOldPassword(e.target.value)}
              value={oldPassword}
            />
            <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.oldPassword?.msg}</p>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Your Name"
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
            />
            <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.password?.msg}</p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Your Name"
              onChange={(e)=> setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.confirmPassword?.msg}</p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end d-flex justify-content-end">
            <button type="submit" className={`ud-btn btn-dark d-flex align-items-center justify-content-center ${loading ? "opacity-50": "opacity-100"}`} disabled={loading}>
              {!loading && "Change Password"}
              {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
