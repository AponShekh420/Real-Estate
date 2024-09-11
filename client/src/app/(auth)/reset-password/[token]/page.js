import ResetPassword from "@/components/common/forget-reset/ResetPassword";
import SignIn from "@/components/common/login-signup-modal/SignIn";
import { getSession } from "@/lib/authLib";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Account Reset || Homez - Real Estate NextJS Template",
};

const Reset = async ({params}) => {
  const {token} = params;
  const user = await getSession();
  if(user) {
    redirect('/')
  }
  return (
    <>
      {/* Our Compare Area */}
      <section className="our-compare pt60 pb60">
        <Image
          width={1012}
          height={519}
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb40">
                  <Link href="/">
                    <Image
                      width={120}
                      height={44}
                      className="mb25"
                      src="/images/55&up-logo.png"
                      alt="logo"
                    />
                  </Link>
                  <h2>Reset Password</h2>
                  <p className="text">
                    Set a new password to secure your account
                  </p>
                </div>
                <ResetPassword token={token}/>
                {/* <h5 style={{padding: "150px 0"}}>Thanks, Please check your email to reset the pasword</h5> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default Reset;
