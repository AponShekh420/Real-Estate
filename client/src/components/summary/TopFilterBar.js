'use client'

import React from "react";
import { useSelector } from "react-redux";

const TopFilterBar = () => {
  const {currentPage, totalPages, data: communitiesData} = useSelector(state => state.communityFilter)
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {currentPage}-{totalPages} of {communitiesData?.length}+ results
          </p>
        </div>
      </div>
    </>
  );
};

export default TopFilterBar;
