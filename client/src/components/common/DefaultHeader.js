"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/header.css'
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const {userInfo, loading} = useSelector(state => state.user)

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={90}
                        height={44}
                        src="/images/55&up-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={90}
                        height={44}
                        src="/images/55&up-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <a href="tel:800.888.3754" className="ph-info info-phone d-flex align-items-center mx-2 mx-xl-4 gap-1">
                    <i className="fa-light fa-phone"></i>
                    800.888.3754
                  </a>

                  {userInfo ? (
                    <UserAvatar userInfo={userInfo}/>
                  ) : (
                    <a
                      href="#"
                      className={`login-info d-flex align-items-center ${!loading ? null : "opacity-25"}`}
                      data-bs-toggle={`${loading ? null : "modal"}`}
                      data-bs-target="#loginSignupModal"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">Login / Register</span>
                    </a>
                  )}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
      <ToastContainer/>
    </>
  );
};

export default DefaultHeader;
