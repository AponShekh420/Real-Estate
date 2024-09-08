"use client"

import { usePathname } from "next/navigation";
import React from 'react'

import { useEffect, useState } from "react";
import StateItem from "./stateList/StateItem";
import CityItem from "./cityList/CityItem";
import AreaItem from "./areaList/AreaItem";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });

const AllLocationList = () => {
  const path = usePathname();
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);


  // redux
  const {notify} = useSelector(state => state.state)
  
  // fetch all state, city and area to show these on summery page sidebar as list
  const getExistingDataToUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/anytype`, {credentials: "include"});
      const currentLocationData = await res.json();
      setLoading(false)
      if(currentLocationData?.message) {
        setLocationData(currentLocationData?.data)
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
          {locationData.map((state, stateIndex)=> (
            <li className={`${path.split('/')[2] === state.slug ? "text-danger": ""}`} key={stateIndex}>
              <StateItem state={state}/>
              {/* fist chiled */}
              <ul className="w-90 list-unstyled ml10" style={{marginTop: "2px", }}> {/**height: 0, overflow: "hidden" */}
                {state.city.map((eachCity, cityIndex)=> (
                  <li className={`${path.split('/')[3] === eachCity.slug ? "text-danger": ""}`} key={cityIndex}>
                    <CityItem eachCity={eachCity} state={state}/>
                    {/* second child */}
                    <ul className="w-90 list-unstyled ml10" style={{marginTop: "2px"}}> {/**height: 0, overflow: "hidden" */}
                      {eachCity.area.map((eachArea, areaIndex)=> (
                        <li className={`${path.split('/')[4] === eachArea.slug ? "text-danger": ""}`} key={areaIndex}>
                          <AreaItem eachArea={eachArea} state={state} city={eachCity}/>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllLocationList;
