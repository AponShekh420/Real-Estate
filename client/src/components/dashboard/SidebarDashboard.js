"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GiCheckboxTree } from "react-icons/gi";
import { PiNotePencilThin } from "react-icons/pi";
import AuthCheck from "@/utilis/AuthCheck";




const SidebarDashboard = () => {
  const pathname = usePathname();
  const user = AuthCheck()

  const sidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        // {
        //   href: "/dashboard/message",
        //   icon: "flaticon-chat-1",
        //   text: "Message",
        // },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/dashboard/catagory",
          icon: "FaLocationDot",
          text: "Catagory",
        },
        {
          href: "/dashboard/add-blog",
          icon: "FaLocationDot",
          text: "Add New Blog",
        },
        {
          href: "/dashboard/blogs",
          icon: "FaLocationDot",
          text: "Blogs",
        },
        {
          href: "/dashboard/location",
          icon: "FaLocationDot",
          text: "Location",
        },
        {
          href: "/dashboard/add-community",
          icon: "flaticon-new-tab",
          text: "Add New Commmunity",
        },
        {
          href: "/dashboard/my-communities",
          icon: "flaticon-home",
          text: "My Communities",
        },
        {
          href: "/dashboard/my-favourites",
          icon: "flaticon-like",
          text: "My Favorites",
        },
        // {
        //   href: "/dashboard/saved-search",
        //   icon: "flaticon-search-2",
        //   text: "Saved Search",
        // },
        {
          href: "/dashboard/reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        // {
        //   href: "/dashboard/my-package",
        //   icon: "flaticon-protection",
        //   text: "My Package",
        // },
        {
          href: "/dashboard/my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => {
          let enable = true;
          if(user.role !== "admin" && section.title == "MAIN") {
            enable = false
          }
          return enable ? (
            <div key={sectionIndex}>
              <p
                className={`fz15 fw400 ff-heading ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
              >
                {section.title}
              </p>
              {section.items.map((item, itemIndex) => {
                let enable = false;
                if(user.role == 'admin' && item.text == "Dashboard") {
                  enable = true
                }

                if(user && item.text == "Logout") {
                  enable = true
                }

                if(user && item.text == "My Profile") {
                  enable = true
                }

                if(user.role == "admin" && item.text == "Reviews") {
                  enable = true
                }

                if(user && item.text == "My Favorites") {
                  enable = true
                }

                if(user.role == "admin" && item.text == "My Communities") {
                  enable = true
                }

                if(user.role == "admin" && item.text == "Add New Commmunity") {
                  enable = true
                }

                if(user.role == "admin" && item.text == "Location") {
                  enable = true
                }

                if((user.role == "admin" || user.role == "contributor") && item.text == "Blogs") {
                  enable = true
                }

                if((user.role == "admin" || user.role == "contributor") && item.text == "Add New Blog") {
                  enable = true
                }

                return enable ? (
                  <div key={itemIndex} className="sidebar_list_item">
                    <Link
                      href={item.href}
                      className={`items-center   ${
                        pathname == item.href ? "-is-active" : ""
                      } `}
                    >
                      {item.text === "Location" ? (
                        <CiLocationOn size={22} className="mr15"/>
                      ) : item.text === "Blogs" ? (
                        <HiOutlineNewspaper size={22} className="mr15"/>
                      ) : item.text === "Catagory" ? (
                        <GiCheckboxTree  size={22} className="mr15"/>
                      ): item.text === "Add New Blog" ? (
                        <PiNotePencilThin size={22} className="mr15"/>
                      ): (
                        <i className={`${item.icon} mr15`} />
                      )}
                      {item.text}
                    </Link>
                  </div>
                ) : "";
              })}
            </div>
          ) : "";
        })}
      </div>
    </div>
  );
};

export default SidebarDashboard;
