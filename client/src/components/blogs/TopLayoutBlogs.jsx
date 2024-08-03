"use client"

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const TopLayoutBlogs = () => {
  return (
    <div className="container">
      <div className="row" style={{height: "480px"}}>
        <div className="col-md-7 d-flex justify-content-center align-items-center p-1 py-1">
          <div className="w-100 bg-light d-flex justify-content-center align-items-center bg-black" style={{height: "100%", background: "#BDBDBD !important"}}>
          <Swiper 
            // install Swiper modules
            style={{width: "100%", height: "100%"}}
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
          </div>
        </div>
        <div className="col-md-5 d-flex flex-wrap px-0">
          <div className="col-12 p-1">
            <div className="bg-light d-flex justify-content-center align-items-center" style={{height: "100%", background: "#BDBDBD !important"}}>
              Box 2
            </div>
          </div>
          <div className="col-12 p-1">
            <div className="bg-light d-flex justify-content-center align-items-center bg-black" style={{height: "100%", background: "#BDBDBD !important"}}>
              Box 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopLayoutBlogs;