"use client";
import React, { useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useRouter } from 'next/navigation';
import { geoAlbersUsa } from 'd3-geo'; // Import the projection
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import Tippy's default CSS
import stateLabels from './stateLabelData';

const stateData = {
  California: 120,
  Texas: 85,
  // Add other states with their community counts
};




const Maps = () => {
  const router = useRouter();

  const handleStateClick = (stateName) => {
    router.push(`/summary/${stateName.toLowerCase().split(" ").join("-")}`);
  };



  useEffect(()=> {
    console.log("stateLength:", stateLabels.length)
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%', width: '100%', }}>
      <div style={{ width: '85%', maxWidth: '1200px', height: 'auto', position: 'relative' }}>
        <ComposableMap
          projection={geoAlbersUsa()} // Set the projection to focus on the USA
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas/states-10m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const communities = stateData[stateName] || 0;

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
                          outline: "none"
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  </Tippy>
                );
              })
            }
          </Geographies>

          {stateLabels.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <text
                textAnchor="middle"
                fill="#000"
                fontSize="10px"
                style={{ pointerEvents: 'none' }} // Ensure the text doesn't interfere with interactions
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default Maps;
