import ForgotPassword from "@/components/common/forget-reset/ForgotPassword";
import { getSession } from "@/lib/authLib";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Forgot Password || Homez - Real Estate NextJS Template",
};

const Reset = async () => {
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
                <ForgotPassword />
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
