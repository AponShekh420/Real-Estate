"use client"

import { useState } from "react";
import PropertyDataTable from "../dashboard-my-properties/PropertyDataTable";
import Pagination from "../../Pagination";

const Container = () => {

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [communitiesData, setCommunitiesData] = useState([])

  const getCommunityData = async () => {
    try {
      setLoading(true)
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searchParams: search,
          active
        })
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData.data) {
        setCommunitiesData(currentData.data)
      } else {
        // message for server side error with toastify
      }
    } catch(err) {
      console.log(err.message)
    }
  }




  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
            onClick={()=> setActive(true)}
          >
            1. Active(1000)
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
            onClick={()=> setActive(false)}
          >
            2. Draft(5)
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          {/* the table of community */}
          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="packages_table table-responsive">
                  <PropertyDataTable />

                  <div className="mt30">
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* community table end */}
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          {/* the table of community */}
          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="packages_table table-responsive">
                  <PropertyDataTable />

                  <div className="mt30">
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* community table end */}
        </div>
        {/* End tab for Upload photos of your property */}
        
      </div>
    </>
  );
}

export default Container;