"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopFilterBar = () => {
  const {
    currentPage,
    totalPages,
    data: resultsData,
    sorting,
    resultsTitle,
    lotalNumberOfData
  } = useSelector((state) => state.resultsFilter);
  const dispatch = useDispatch();

  const startData = lotalNumberOfData > 0 ? ((currentPage - 1) * 20) + 1 : 0;
  const endData = lotalNumberOfData > 0 ? (currentPage * 20) >= lotalNumberOfData ? lotalNumberOfData : (currentPage * 20) : 0;

  
  return (
    <>
      <div className="col-7">
        <div className="text-center text-xxl-center">
          <p className="pagination_page_count mb-0">
            {
              resultsTitle ? `Showing ${startData}-${endData} of ${lotalNumberOfData} Results for: ${resultsTitle}` : `55&UP Search`
            }
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
