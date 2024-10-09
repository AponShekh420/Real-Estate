"use client"
import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";

const sortOptions = [
  "Newest",
  "Best Seller",
  "Best Match",
  "Price Low",
  "Price High",
];

const AllReviews = ({reviews, setReviews, setCurrentPage, setTotalPages, totalPages, currentPage}) => {
  const [roundedAverage, setRoundedAverage ] = useState(0);


  useEffect(()=> {
    const ratingArray = reviews.map(review => review.rating);
    // Step 1: Calculate the sum of all reviews
    const sum = ratingArray.reduce((acc, rating) => acc + rating, 0);

    // Step 2: Calculate the average rating
    const averageRating = sum / ratingArray.length;

    // Step 3: Optionally, round the result to 1 or 2 decimal places
    setRoundedAverage(averageRating.toFixed(1))
  }, [reviews])

  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                {roundedAverage} · {reviews.length} reviews
              </h6>
              <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                <div className="pcs_dropdown mb15 d-flex align-items-center">
                  <span style={{ minWidth: "60px" }}>Sort by</span>
                  <select className="form-select">
                    {sortOptions.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* End review filter */}

          <SingleReview reviews={reviews} setReviews={setReviews} totalPages={totalPages} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
