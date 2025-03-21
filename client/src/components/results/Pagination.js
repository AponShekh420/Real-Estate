"use client";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {

  const {data: resultsData, totalPages, currentPage} = useSelector(state => state.resultsFilter);
  const dispatch = useDispatch();

  // const {communities, blogs, states, areas} = resultsData;
  // const totalValue = communities?.length + blogs?.length + states?.length + areas?.length
  // const result = totalValue > 0 ? totalValue : 0;




  const handlePageClick = (page) => {
    dispatch(addCommunityFilterValue({
      currentPage: page,
    }))
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // You can set the maximum number of page numbers to show in the pagination

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const renderPageNumbers = generatePageNumbers().map((page) => (
    <li
      key={page}
      className={`page-item${page === currentPage ? " active" : ""}`}
    >
      <span
        className="page-link pointer"
        href="#"
        onClick={() => handlePageClick(page)}
      >
        {page}
      </span>
    </li>
  ));

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <span
            className="page-link pointer"
            href="#"
            onClick={() => currentPage != 1 && handlePageClick(currentPage - 1)}
          >
            <span className="fas fa-angle-left" />
          </span>
        </li>
        {renderPageNumbers}
        <li className="page-item pointer">
          <span
            className="page-link"
            href="#"
            onClick={() => currentPage != totalPages && handlePageClick(currentPage + 1)}
          >
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        {currentPage}-{totalPages} of {resultsData.length} Search Results
      </p>
    </div>
  );
};

export default Pagination;
