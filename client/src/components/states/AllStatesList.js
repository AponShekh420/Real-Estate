"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const sanitizeHtml = (htmlString) => {
  // Create a temporary div to parse the HTML string
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Return the plain text while preserving the text from any HTML tags
  return tempDiv.innerText || tempDiv.textContent || '';
};




const AllStatesList = () => {
  const [data, setData] = useState([]);

  const getAllCities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/get-only-with-communities`, {
        credentials: "include",
        method: "POST",
      });

      const resData = await res.json();
      if(resData?.message) {
        setData(resData?.data);
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    getAllCities()
  }, [])

  return (
    <div className="row">
      {data?.map((state) => (
        <Link href={`/summary/${state?.slug}`} key={state._id} className="col-6 col-md-4 col-lg-3 col-xl-2 mb50">
          <div className="item">
            <div className="feature-style3 text-center d-flex flex-column align-items-center">
              <div className="feature-img rounded-circle" style={{width: "176px", height: "176px"}}>
                <Image
                  width={100}
                  height={100}
                  className="w-100 h-100 cover"
                  src={state?.img || "/images/city_placeholder.png"}
                  alt="state"
                />
              </div>
              <div className="feature-content pt25">
                <div className="top-area">
                  <h6 className="title mb-1">
                    <span href={`/summary/${state?.slug}`}>{state.name} ({state?.community?.length})</span>
                  </h6>
                  <p className="fz15 fw400 dark-color mb-0" style={{ fontSize: '16px' }}>
                    {sanitizeHtml(state?.desc).slice(0, 40)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllStatesList;
