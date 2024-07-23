import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import React from 'react'

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const LocationList = () => {
  const path = usePathname();
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all state, city and area to show these on summery page sidebar as list
  const getExistingDataToUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/state/getall/active');
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
  }, [])


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
              <Link href={`/summary/${state.slug}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <p className={`text-capitalize m-0 ${path.split('/')[2] === state.slug ? "text-danger": ""}`}><b>{state.name} ({state.community.length})</b></p>
                  <IoIosArrowDown className="p-0"/>
                </div>
              </Link>
              {/* fist chiled */}
              <ul className="w-90 list-unstyled ml10" style={{marginTop: "2px", height: path.split('/')[2] === state.slug ? "100%": "0", overflow: path.split('/')[2] === state.slug ? "visible": "hidden" }}> {/**height: 0, overflow: "hidden" */}
                {state.city.map((eachCity, cityIndex)=> (
                  <li className={`${path.split('/')[3] === eachCity.slug ? "text-danger": ""}`} key={cityIndex}>
                    <Link href={`/summary/${state.slug}/${eachCity.slug}`}>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className={`text-capitalize m-0 ${path.split('/')[3] === eachCity.slug ? "text-danger": ""}`}>{eachCity.name} ({eachCity.community.length})</p>
                        <IoIosArrowDown className="p-0"/>
                      </div>
                    </Link>
                    {/* second child */}
                    <ul className="w-90 list-unstyled ml10" style={{marginTop: "2px", height: path.split('/')[3] === eachCity.slug ? "100%": "0", overflow: path.split('/')[3] === eachCity.slug ? "visible": "hidden" }}> {/**height: 0, overflow: "hidden" */}
                      {eachCity.area.map((eachArea, areaIndex)=> (
                        <li className={`${path.split('/')[4] === eachArea.slug ? "text-danger": ""}`} key={areaIndex}>
                          <Link href={`/summary/${state.slug}/${eachCity.slug}/${eachArea.slug}`}>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className={`text-capitalize m-0 ${path.split('/')[4] === eachArea.slug ? "text-danger": ""}`}>{eachArea.name} ({eachArea.community.length})</p>
                            </div>
                          </Link>
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

export default LocationList;
