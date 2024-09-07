"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";

const states = [
  "California", "Texas", "New York", "Florida", "Illinois", 
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan", 
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts", 
  "Tennessee", "Indiana", "Missouri", "Maryland", "Wisconsin",
  // Add more states as needed
];


function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}


const StateList = () => {

  const [data, setData] = useState([])
  


  const getStates = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/get-only-with-communities`);
      const resData = await res.json();
      if(resData?.data) {
        const {data} = resData;
        const columns = chunkArray(data, Math.ceil(states.length / 8));
        setData(columns)
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  useEffect(()=> {
    getStates();
  }, [])



  return (
    <div className="cta-banner bgc-f7 w-100 bdrt1">
      <div className="container py-3">
        <div style={{ display: "flex" }}>
          {data?.map((column, index) => (
            <div key={index} style={{ flex: 1, padding: "0 10px" }}>
              <ul>
                {column?.map((state, idx) => (
                  <li key={idx} className="text-capitalize">
                    <Link href={`/summary/${state?.slug}`}>
                      {state?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateList;
