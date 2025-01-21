"use client";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const PropertyGallery = ({ id, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { imgs: images, thumbnail } = data;

  console.log("thumbnail:", thumbnail);

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
            {thumbnail && (
              <SwiperSlide>
                <Item
                  original={thumbnail}
                  thumbnail={thumbnail}
                  width={1206}
                  height={671}
                >
                  {({ ref, open }) => (
                    <Image
                      width={1206}
                      height={671}
                      ref={ref}
                      onClick={open}
                      src={thumbnail}
                      alt="gallery"
                      className="w-100 h-auto bdrs12 pointer"
                    />
                  )}
                </Item>

                {images.length > 1 ? (
                  <button className="all-tag popup-img border-0 pe-none">
                    See All {images.length} Photos
                  </button>
                ) : null}
              </SwiperSlide>
            )}

            {images.map(
              (item, i) =>
                item != thumbnail && (
                  <SwiperSlide key={i}>
                    <Item
                      original={item}
                      thumbnail={item}
                      width={1206}
                      height={671}
                    >
                      {({ ref, open }) => (
                        <Image
                          width={1206}
                          height={671}
                          ref={ref}
                          onClick={open}
                          src={item}
                          alt="gallery"
                          className="w-100 h-auto bdrs12 pointer"
                        />
                      )}
                    </Item>

                    {images.length > 1 ? (
                      <button className="all-tag popup-img border-0 pe-none">
                        See All {images.length} Photos
                      </button>
                    ) : null}
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </Gallery>

        <div className="row">
          <div
            className={`${
              images.length < 4 ? "col-lg-5 col-md-6" : "col-lg-8 col-md-9"
            }`}
          >
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
              {thumbnail && (
                <SwiperSlide>
                  <Image
                    height={90}
                    width={83}
                    src={thumbnail}
                    alt="image"
                    className="w-100 bdrs12 cover pointer"
                  />
                </SwiperSlide>
              )}
              {images.map(
                (item, i) =>
                  item != thumbnail && (
                    <SwiperSlide key={i}>
                      <Image
                        height={90}
                        width={83}
                        src={item}
                        alt="image"
                        className="w-100 bdrs12 cover pointer"
                      />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyGallery;
