import Link from "next/link";
import React from "react";
import { FaFileExport } from "react-icons/fa6";

let searchTime;

const FilterHeader = ({ setSearch, setCurrentPage}) => {

  const handleDownload = () => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/subscribe/export?timestamp=${new Date().getTime()}`;
    window.location.href = downloadUrl;  // This ensures a fresh download request
  };

  return (
    <div className="dashboard_search_meta d-md-flex align-items-center gap-4 justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Search"
            required
            onChange={(e)=> {
              clearTimeout(searchTime);
              searchTime = setTimeout(()=> {
                setCurrentPage(1) 
                setSearch(e.target.value)
              }, 700)
            }}
            // value={search}
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="item2">
        <button
          onClick={handleDownload}
          type="button"
          className="btn btn-success d-flex gap-2 align-items-center fw-bold text-white"
          style={{
            fontSize: "17px",
            padding: "12.7px 15px",
            boxShadow: "6px 6px 13px 2px rgba(0, 0, 0, 0.2)"
          }}
        >
          Export <FaFileExport />
        </button>
      </div>
        {/* End item2 */}
    </div>
  );
};

export default FilterHeader;
