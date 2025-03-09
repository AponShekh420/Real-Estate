"use client";

import { getTotalCount } from "@/utilis/getTotalCount";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// const sanitizeToParagraphs = (htmlString) => {
//   // Create a temporary div to parse the HTML string
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = htmlString;

//   // Find and return only <p> elements
//   const paragraphs = tempDiv.querySelectorAll('p');
//   return Array.from(paragraphs).map((p) => p.textContent).join(' ').slice(0, 40);
// };
const sanitizeHtml = (htmlString) => {
  // Create a temporary div to parse the HTML string
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Return the plain text while preserving the text from any HTML tags
  return tempDiv.innerText || tempDiv.textContent || "";
};

const CommunityByStates = () => {
  const [data, setData] = useState([]);

  const getAllCities = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/get-only-with-communities`,
        {
          credentials: "include",
          method: "POST",
          body: {
            limit: 6,
          },
        }
      );

      const resData = await res.json();

      if (resData?.message) {
        setData(resData?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-city-next__active",
          prevEl: ".property-by-city-prev__active",
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {data?.map((state) => (
          <SwiperSlide key={state._id}>
            <Link href={`/summary/${state?.slug}`}>
              <div className="item">
                <div className="feature-style3 text-center">
                  <div
                    className="feature-img rounded-circle"
                    style={{ width: "176px", height: "176px" }}
                  >
                    <Image
                      width={100}
                      height={100}
                      className="w-100 h-100 cover"
                      src={state?.img || "/images/city_placeholder.png"}
                      alt="state"
                    />
                  </div>
                  <div className="feature-content pt25">
                    <div className="top-area">
                      <h6 className="title mb-1">
                        <span href={`/summary/${state?.slug}`}>
                          {state.name} ({getTotalCount(state?.community)})
                        </span>
                      </h6>
                      {/* <p
                        className="fz15 fw400 dark-color mb-0"
                        style={{ fontSize: "16px" }}
                      >
                        {sanitizeHtml(state?.desc).slice(0, 40)}...
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="property-by-city-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="property-by-city-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default CommunityByStates;
