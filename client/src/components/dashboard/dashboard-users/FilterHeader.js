import Link from "next/link";
import React from "react";

let searchTime;

const FilterHeader = ({ setSearch, search, setCurrentPage}) => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
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
    </div>
  );
};

export default FilterHeader;
