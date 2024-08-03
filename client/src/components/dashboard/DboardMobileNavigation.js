"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(state => state.user);



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
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}
        >
          <i className="fa fa-bars pr10" /> Dashboard Navigation
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {sidebarItems.map((section, sectionIndex) => {
            let enable = true;
            if(user.role !== "admin" && section.title == "MAIN") {
              enable = false
            }
            return enable ? (
              <div key={sectionIndex}>
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

                  if((user.role == "admin" || user.role == "contributor") && item.text == "Catagory") {
                    enable = true
                  }

                  return enable ? (
                    <MenuItem itemIndex={itemIndex} item={item}/>
                  ) : "";
                })}
              </div>
            ) : "";
          })}
        </ul>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
