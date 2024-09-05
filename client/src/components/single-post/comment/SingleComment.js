"use client";
// import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";


const SingleComment = ({data, setComments, comments}) => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);


  const getComment = async () => {
    console.log("blogId", data)
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/comment/get/${data?._id}`, {
        credentials: "include"
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData?.data) {
        setComments(currentData?.data);
      } else {
        console.log("data", currentData)
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  useEffect(() => {
    getComment()
  }, [])


  return (
    <>
      {comments?.slice(0, showMore ? comments.length : 3)?.map((comment, index) => (
        <div className="col-md-12" key={index}>
          <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
            <Image
              width={60}
              height={60}
              style={{objectFit: "cover"}}
              className="rounded-circle mr-3"
              src={comment?.user?.avatar?.split("/")[2] !== "lh3.googleusercontent.com" ? `${process.env.NEXT_PUBLIC_BACKEND_API}/assets/users/${comment?.user?.avatar}` : comment?.user?.avatar || "/images/user_avatar.png"}
              alt={comment?.user?.firstName + " " + comment?.user?.lastName}
            />
            <div className="ml20">
              <h6 className="mt-0 mb-0">{comment?.user?.firstName + " " + comment?.user?.lastName} </h6>
              <div>
                <span className="fz14">
                <Moment format="D MMM YYYY">
                  {comment?.createdAt}
                </Moment>
                </span>
              </div>
            </div>
          </div>
          {/* End .d-flex */}

          <p className="text mt20 mb20">{comment?.text}</p>
          <div className="review_cansel_btns d-flex bdrb1 pb30">
            <a href="#">
              <i className="fas fa-thumbs-up" />
              Helpful
            </a>
            <a href="#">
              <i className="fas fa-thumbs-down" />
              Not helpful
            </a>
          </div>
        </div>
      ))}

      <div className="col-md-12">
        <div className="position-relative bdrb1 pt30 pb20">
          <button className="ud-btn btn-white2" onClick={() => setShowMore((old)=> !old)}>
            {!showMore ? `Show all ${comments?.length} reviews` : "Show Less"}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleComment;
