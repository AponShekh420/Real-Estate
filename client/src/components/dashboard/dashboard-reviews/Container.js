"use client"
import { useState } from "react";
import Pagination from "./Pagination";
import AllReviews from ".";

const Container = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [totalPages, setTotalPages] = useState(1)
  const [reviews, setReviews] = useState([]);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <AllReviews setReviews={setReviews} reviews={reviews} totalPages={totalPages} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <div className="mt30">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} data={reviews}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;