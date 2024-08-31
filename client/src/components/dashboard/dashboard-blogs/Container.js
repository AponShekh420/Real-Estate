"use client"

import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import FilterHeader from "./FilterHeader";
import BlogsDataTable from "./BlogsDataTable";
import { MoonLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const Container = () => {

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [deletedData, setDeleteData] = useState({}); // deleted data notification
  let totalPages = 1; // Total number of pages


  const getBlogsData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/get-blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searchParams: search,
          active,
          limitStart: (currentPage - 1 ) * 10,
          limitEnd: currentPage * 10,
        })
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData.data) {
        totalPages = currentData.lotalNumberOfData / 10 <= 1 ? 1 : Math.ceil(currentData.lotalNumberOfData / 10);
        setBlogsData(currentData);
      } else {
        // message for server side error with toastify
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    getBlogsData();
  }, [active, search, deletedData])

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-xxl-3">
          <div className="dashboard_title_area">
            <h2>All Blogs</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-xxl-9">
          <FilterHeader setSearch={setSearch} search={search} />
        </div>
      </div>


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
            onClick={()=> {
              setActive(true);
            }}
          >
            1. Active
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
            onClick={()=> {
              setActive(false);
            }}
          >
            2. Draft
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
              <div className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative ${loading ? "d-flex justify-content-center align-items-center": ""}`}>
                <div className={`packages_table table-responsive ${loading ? "d-flex justify-content-center align-items-center": ""}`} style={loading ? {height:"500px"} : {}}>
                    {loading ? (
                      <div className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white" style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
                        <MoonLoader
                          color="black"
                          loading={loading}
                          cssOverride={override}
                          size={30}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                      ) : blogsData?.data?.length == 0 ? <h1 style={{height: "400px"}} className="d-flex align-items-center justify-content-center">No Data Found</h1> : <BlogsDataTable blogsData={blogsData} setDeleteData={setDeleteData} key={1}/>}

                  <div className="mt30">
                    {loading ? (<div></div>) : (<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} data={blogsData}/>)}
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
              <div className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative ${loading ? "d-flex justify-content-center align-items-center": ""}`}>
                <div className={`packages_table table-responsive ${loading ? "d-flex justify-content-center align-items-center": ""}`} style={loading ? {height:"400px"} : {}}>
                  {loading ? (
                    <div className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white" style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
                      <MoonLoader
                        color="black"
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                    ) : blogsData?.data?.length == 0 ? <h1 style={{height: "400px"}} className="d-flex align-items-center justify-content-center">No Data Found</h1> : <BlogsDataTable setDeleteData={setDeleteData} blogsData={blogsData} key={2}/>}

                  <div className="mt30">
                   {loading ? (<div></div>) : (<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} data={blogsData}/>)}
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