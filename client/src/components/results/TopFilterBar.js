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
      <div className="w-100">
        <h3 className="resultsTitle">
          {
            resultsTitle ? `Showing ${startData}-${endData} of ${lotalNumberOfData} Results for: ${resultsTitle}` : `55&UP Search`
          }
        </h3>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
