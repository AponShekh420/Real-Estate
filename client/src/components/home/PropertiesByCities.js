"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PropertiesByCities = () => {
  const [data, setData] = useState([]);

  const getAllCities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/getall`, {
        credentials: "include",
      });

      const resData = await res.json();
      if(resData?.msg) {
        setData(resData?.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    getAllCities()
  }, [])

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
        {data?.map((city) => (
          <SwiperSlide key={city._id}>
            <div className="item">
              <div className="feature-style3 text-center">
                <div className="feature-img rounded-circle" style={{width: "176px", height: "176px"}}>
                  <Image
                    width={100}
                    height={100}
                    className="w-100 h-100 cover"
                    src={city?.img ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/location/${city?.img}` : "/images/city_placeholder.png"}
                    alt="cities"
                  />
                </div>
                <div className="feature-content pt25">
                  <div className="top-area">
                    <h6 className="title mb-1">
                      <Link href={`/summary/${city?.state?.slug}/${city?.slug}`}>{city.name}</Link>
                    </h6>
                    <p className="fz15 fw400 dark-color mb-0">
                      {city?.community?.length} communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

export default PropertiesByCities;
