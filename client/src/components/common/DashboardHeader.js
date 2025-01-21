"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MenuItem from "../dashboard/MenuItem";
import NavAvatarLoading from "./NavAvatarLoading";

const DashboardHeader = () => {
  const { userInfo, loading } = useSelector((state) => state.user);
  const pathname = usePathname();
  const isAddPage = pathname.split("/")[2] === "add-community" ? true : false;
  const menuItems = [
    {
      href: "/dashboard",
      icon: "flaticon-discovery",
      text: "Dashboard",
      roles: ["admin", "contributor"], // Specify roles that can access this item
    },
    {
      href: "/my-favourites",
      icon: "flaticon-like",
      text: "My Favorites",
      roles: ["user", "admin", "contributor"],
    },
    {
      href: "/my-profile",
      icon: "flaticon-user",
      text: "My Profile",
      roles: ["user", "admin", "contributor"],
    },
    {
      href: "/login",
      icon: "flaticon-logout",
      text: "Logout",
      roles: ["user", "admin", "contributor"],
    },
  ];

  useEffect(() => {
    if (!isAddPage) {
      localStorage.removeItem("draftCommunityId");
    }
  }, [pathname]);

  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image
                        width={90}
                        height={44}
                        src="/images/55&up-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  {/* <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    <li className="d-none d-sm-block">
                      <Link className="text-center mr15" href="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li>
                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li>
                    {/* End notification icon */}

                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <Image
                            width={44}
                            height={44}
                            style={{ objectFit: "cover" }}
                            className="rounded-circle"
                            src={userInfo?.avatar}
                            alt={userInfo?.firstName + " " + userInfo?.lastName}
                          />
                        </a>
                        <div className="dropdown-menu">
                          {loading ? (
                            <NavAvatarLoading />
                          ) : (
                            <div className="user_setting_content">
                              <div className="col-12 mb10">
                                <div
                                  className="message_container mt30-md"
                                  style={{
                                    boxShadow: "none",
                                    borderRadius: "none",
                                  }}
                                >
                                  <div className="user_heading px-0 py-4 pt-0">
                                    <div className="wrap">
                                      <span className="contact-status online" />
                                      <Image
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "cover" }}
                                        className="rounded-circle"
                                        src={userInfo?.avatar}
                                        alt={
                                          userInfo?.firstName +
                                          " " +
                                          userInfo?.lastName
                                        }
                                      />
                                      <div className="meta d-sm-flex justify-content-sm-between align-items-center">
                                        <div className="authors">
                                          <h6 className="name mb-0">
                                            {userInfo?.firstName}{" "}
                                            {userInfo?.lastName}
                                          </h6>
                                          <p
                                            className="preview"
                                            style={{
                                              wordBreak: "break-all",
                                              overflowWrap: "break-word",
                                              width: "100%",
                                            }}
                                          >
                                            {userInfo?.email}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {menuItems?.map((item, itemIndex) => {
                                const isAuthorized = item?.roles.includes(
                                  userInfo?.role
                                );

                                return isAuthorized ? (
                                  <MenuItem
                                    key={itemIndex}
                                    item={item}
                                    headerItem={true}
                                    userInfo={userInfo}
                                  />
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

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
    </>
  );
};

export default DashboardHeader;
