"use client";
import React, { useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useRouter } from 'next/navigation';
import { geoAlbersUsa } from 'd3-geo'; // Import the projection
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import Tippy's default CSS
import stateLabels from './stateLabelData';

const stateData = {};

// const abbreviateStates = {
//   "Delaware": "DE",
//   "New Hampshire": "NH",
//   "Rhode Island": "RI",
//   "Connecticut": "CT",
//   "Massachusetts": "MA",
//   // Add more as needed
// };


const Maps = () => {
  const router = useRouter();

  const handleStateClick = (stateName) => {
    router.push(`/summary/${stateName.toLowerCase().split(" ").join("-")}`);
  };


  const getStates = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/get-only-with-communities`, {credentials: "include"});
      const resData = await res.json();
      if(resData?.data) {
        const {data} = resData;
        data?.forEach(state => stateData[state?.name?.toLowerCase()] = state?.community?.length);
        return;
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  useEffect(()=> {
    getStates();
  }, [])

  return (
    <div className='home-hero-map'>
      <div style={{ width: '100%', maxWidth: '1200px', height: 'auto', position: 'relative' }}>
        <ComposableMap
          projection={geoAlbersUsa()} // Set the projection to focus on the USA
          style={{ width: '100%', height: 'auto' }}
          viewBox='0 0 1000 600'
        >
          <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas/states-10m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const lowerCaseState = stateName?.toLowerCase();
                const communities = stateData[lowerCaseState] || 0;

                return (
                  <Tippy
                    key={geo.rsmKey}
                    content={`${stateName}: ${communities} communities`}
                    placement="top"
                    arrow
                    theme="light"
                    style={{ zIndex: 1000, backgroundColor: "red" }} // Ensure tooltip is on top
                  >
                    <Geography
                      geography={geo}
                      onClick={() => handleStateClick(stateName)}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          stroke: "#000",       // Add black outline
                          strokeWidth: 0.5,        // Outline thickness
                          outline: "none"
                        },
                        hover: {
                          fill: "#F53",
                          stroke: "#000",        // Keep outline during hover
                          strokeWidth: 1,        // Increase thickness on hover
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          stroke: "#000",        // Keep outline during press
                          strokeWidth: 1.5,      // Increase thickness when pressed
                          outline: "none"
                        }
                      }}
                    />
                  </Tippy>
                );
              })
            }
          </Geographies>

          {/* {stateLabels.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <text
                textAnchor="middle"
                fill="#000"
                fontSize="10px"
                style={{ pointerEvents: 'none' }} // Ensure the text doesn't interfere with interactions
              >
                 {abbreviateStates[name] || name}
              </text>
            </Marker>
          ))} */}
        </ComposableMap>
      </div>
    </div>
  );
};

export default Maps;
