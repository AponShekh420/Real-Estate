"use client"

import { usePathname } from "next/navigation";
import React from 'react'

import { useEffect, useState } from "react";
import CatagoryItem from "./parentsCatagory/CatagoryItem";
import dynamic from "next/dynamic";
import store from "@/redux/store";
import { useSelector } from "react-redux";

const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });


const AllCatagoriesList = () => {
  const path = usePathname();
  const [catagoryData, setCatagoryData] = useState([]);
  const [loading, setLoading] = useState(true);


  // redux
  const {notify} = useSelector(state =>  state.catagory);


  // fetch all state, city and area to show these on summery page sidebar as list
  const getExistingDataToUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/getall`, {credentials: "include"});
      const currentCatagoryData = await res.json();
      setLoading(false)
      if(currentCatagoryData?.message) {
        setCatagoryData(currentCatagoryData?.data)
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
  }, [notify])


  return (
    <div className="w-100">
      {loading ? (
        <ContentLoader viewBox="0 0 400 150" height={200} width={500} >
          <rect x="0" y="15" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="40" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="65" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="90" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="115" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="140" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="165" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      ) : (
        <ul className="w-100 list-unstyled">
          {catagoryData.map((catagory, stateIndex)=> (
            <li className={`${path.split('/')[2] === catagory.slug ? "text-danger": ""}`} key={stateIndex}>
              <CatagoryItem catagory={catagory}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCatagoriesList;
