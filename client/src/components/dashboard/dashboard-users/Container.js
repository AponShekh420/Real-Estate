"use client"

import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import FilterHeader from "./FilterHeader";
import { MoonLoader } from "react-spinners";
import UsersTable from "./UsersTable";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const Container = () => {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [deletedData, setDeleteData] = useState({}); // deleted data notification
  const [totalPages, setTotalPages] = useState(1)


  const getBlogsData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/get-users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searchParams: search,
          limitStart: (currentPage - 1 ) * 10,
          limitEnd: currentPage * 10,
        })
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData.data) {
        setTotalPages(
          Math.ceil(currentData.lotalNumberOfData / 10) <= 1 
            ? 1 
            : Math.ceil(currentData.lotalNumberOfData / 10)
        );
        setUsersData(currentData);
      } else {
        // message for server side error with toastify
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    getBlogsData();
  }, [search, deletedData, currentPage])

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-xxl-3">
          <div className="dashboard_title_area">
            <h2>All Users</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-xxl-9">
          <FilterHeader setSearch={setSearch} search={search} />
        </div>
      </div>

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
                ) : usersData?.data?.length == 0 ? <h1 style={{height: "400px"}} className="d-flex align-items-center justify-content-center">No Data Found</h1> : <UsersTable setDeleteData={setDeleteData} usersData={usersData} key={2}/>}

              <div className="mt30">
                {loading ? (<div></div>) : (<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} data={usersData}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* community table end */}
    </>
  );
}

export default Container;