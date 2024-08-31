"use client"
import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import React, { useState } from 'react'

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, usecatagory } from "react";
import ContentLoader from "react-content-loader";
import ContentLoaderWrapper from "./ContentLoaderWrapper";

const CatagoriesList = () => {
  const path = usePathname();
  const [catagoriesData, setCatagoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all catagory, city and area to show these on summery page sidebar as list
  const getExistingDataToUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/getall`);
      const currentCatagoriesData = await res.json();
      setLoading(false)
      if(currentCatagoriesData?.message) {
        setCatagoryData(currentCatagoriesData?.data)
      } else {
        // do something
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    getExistingDataToUpdate();
    console.log(path.split('/')[4])
  }, [])


  return (
    <div className="w-100">
      <div className="sidebar-widget mb30">
        <h6 className="widget-title">Catagories</h6>
        {loading ? (
          <ContentLoaderWrapper/>
        ) : (
          <ul className="w-100 list-unstyled">
            {catagoriesData.map((catagory, catagoryIndex)=> (
              <li className={`${path.split('/')[2] === catagory.slug ? "text-danger": ""}`} key={catagoryIndex}>
                <Link href={`/blogs/${catagory.slug}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={`text-capitalize m-0 ${path.split('/')[2] === catagory.slug ? "text-danger": ""}`}>{catagory.name} ({catagory?.blogs?.length})</p>
                    {path.split('/')[2] !== catagory.slug ? <IoIosArrowDown className="p-0"/> : <IoIosArrowUp className="p-0 text-danger"/> }
                  </div>
                </Link>
                {/* fist chiled */}
                <ul className="w-90 list-unstyled ml10" style={{marginTop: "2px", height: path.split('/')[2] === catagory.slug ? "100%": "0", overflow: path.split('/')[2] === catagory.slug ? "visible": "hidden" }}> {/**height: 0, overflow: "hidden" */}
                  {catagory?.subcatagory?.map((eachSubcatagory, cityIndex)=> {
                    return (
                      <li className={`${path.split('/')[3] === eachSubcatagory.slug ? "text-danger": ""}`} key={cityIndex}>
                        <Link href={`/blogs/${catagory.slug}/${eachSubcatagory.slug}`}>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className={`text-capitalize m-0 ${path.split('/')[3] === eachSubcatagory.slug ? "text-danger": ""}`}>{eachSubcatagory.name} ({eachSubcatagory.blogs.length})</p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatagoriesList;
