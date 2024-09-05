"use client"
import React, { useState } from "react";
import SingleComment from "./SingleComment";

const sortOptions = [
  "Newest",
  "Best Seller",
  "Best Match",
  "Price Low",
  "Price High",
];

const AllComment = ({data}) => {
  const [comments, setComments] = useState([]);
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20">
              <h6 className="fz17 mb15">
                {comments?.length} Comments
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

          <SingleComment data={data} comments={comments} setComments={setComments}/>
          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllComment;
