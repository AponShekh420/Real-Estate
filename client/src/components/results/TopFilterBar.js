"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopFilterBar = () => {
  const {
    currentPage,
    totalPages,
    data: resultsData,
    sorting,
  } = useSelector((state) => state.resultsFilter);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("total", typeof totalValue)
  //   console.log("result", result)
  // }, [resultsData])

  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {currentPage}-{totalPages} of {resultsData.length}+
            results
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
