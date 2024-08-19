"use client";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";


const PropertyGallery = ({ id, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const {imgs: images} = data;

  console.log(images)

  return (
    <>
      <div className="ps-v6-slider nav_none mt30 mb30">
        <Gallery>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 position-relative sp-img-content"
          >
            {images.map((item, i) => (
              <SwiperSlide key={i}>
                <Item
                  original={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${item}`}
                  thumbnail={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${item}`}
                  width={1206}
                  height={671}
                >
                  {({ ref, open }) => (
                    <Image
                      width={1206}
                      height={671}
                      ref={ref}
                      onClick={open}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${item}`}
                      alt="gallery"
                      className="w-100 h-auto bdrs12 pointer"
                    />
                  )}
                </Item>

                {images.length > 1 ? (
                  <button className="all-tag popup-img border-0 pe-none">
                    See All {images.length} Photos
                  </button>
                ): null}
              </SwiperSlide>
            ))}
          </Swiper>
        </Gallery>

        <div className="row">
          <div className={`${images.length < 4 ? "col-lg-4 col-md-5" : "col-lg-7 col-md-8"}`}>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={images.length < 4 ? images.length : 4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt20"
            >
              {images.map((item, i) => (
                <SwiperSlide key={i}>
                  <Image
                    height={90}
                    width={83}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${item}`}
                    alt="image"
                    className="w-100 bdrs12 cover pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyGallery;
