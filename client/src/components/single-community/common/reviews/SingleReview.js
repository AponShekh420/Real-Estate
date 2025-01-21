"use client";
// import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Pagination from "./Pagination";

const SingleReview = ({ data, setReviews, reviews }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [totalPages, setTotalPages] = useState(1);

  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/review/get/${data?._id}`,
        {
          credentials: "include",
        }
      );
      const currentData = await res.json();
      console.log(currentData);
      setLoading(false);
      if (currentData?.data) {
        setReviews(currentData?.data);
        setTotalPages(
          Math.ceil(currentData?.data?.length / 10) <= 1
            ? 1
            : Math.ceil(currentData?.data?.length / 10)
        );
      } else {
        console.log("data", currentData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      {reviews
        ?.slice((currentPage - 1) * 10, currentPage * 10)
        ?.map((review, index) => (
          <div className="col-md-12" key={index}>
            <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
              <Image
                width={60}
                height={60}
                style={{ objectFit: "cover" }}
                className="rounded-circle mr-3"
                src={review?.user?.avatar || "/images/user_avatar.png"}
                alt={review?.user?.firstName + " " + review?.user?.lastName}
              />
              <div className="ml20">
                <h6 className="mt-0 mb-0">
                  {review?.user?.firstName + " " + review?.user?.lastName}{" "}
                </h6>
                <div>
                  <span className="fz14">
                    <Moment format="D MMM YYYY">{review?.createdAt}</Moment>
                  </span>
                  <div className="blog-single-review">
                    <ul className="mb0 ps-0">
                      {[...Array(review?.rating)].map((_, i) => (
                        <li className="list-inline-item me-0" key={i}>
                          <a href="#">
                            <i className="fas fa-star review-color2 fz10" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* End .d-flex */}

            <p className="text mt20 mb20">{review?.review}</p>
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
        <div className="position-relative pt30">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            data={reviews}
          />
        </div>
      </div>
    </>
  );
};

export default SingleReview;
