"use client";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./property.css";
const PropertyGallery = ({ id, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const {
    imgs: images,
    thumbnail,
    embedVideo,
  } = data ? data : { imgs: [], thumbnail: "" };

  // Function to enable video interaction after swipe
  const enableVideoInteraction = () => {
    document.querySelectorAll(".videoEmbed iframe").forEach((iframe) => {
      iframe.style.pointerEvents = "auto"; // Enable video interaction
    });
  };
  const controlLayout = () => {
    return embedVideo ? images.length + 1 : images.length;
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="ps-v6-slider nav_none mt30 mb30 ">
        <div className="container-swipers-slider">
          <Gallery>
            <Swiper
              // height={}
              autoHeight={true}
              onSlideChange={enableVideoInteraction} // Also enable when slide changes
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={10}
              observer={true}
              observeParents={true}
              lazy={true}
              navigation={{
                prevEl: ".custom-prev-btn",
                nextEl: ".custom-next-btn",
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 position-relative sp-img-content "
              // style={{height: "auto"}}
            >
              {embedVideo && (
                <SwiperSlide>
                  <Item
                    original={thumbnail}
                    thumbnail={thumbnail}
                    width={1206}
                    height={550}
                  >
                    {({ ref, open }) => (
                      <div
                        style={{height: "auto"}}
                        ref={ref}
                        className=" bdrs12 pointer videoEmbed"
                        dangerouslySetInnerHTML={{ __html: embedVideo }}
                      />
                    )}
                  </Item>
                </SwiperSlide>
              )}
              {thumbnail && (
                <SwiperSlide>
                  <Item
                    original={thumbnail}
                    thumbnail={thumbnail}
                    width={1206}
                    height={550}
                  >
                    {({ ref, open }) => (
                      <Image
                        width={1206}
                        height={0}
                        ref={ref}
                        onClick={open}
                        src={thumbnail}
                        alt="gallery"
                        className="bdrs12 pointer slider-item-image community-single-page-slider-image-item"
                        style={{height: "auto"}}
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
                        height={550}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={1206}
                            height={0}
                            ref={ref}
                            onClick={open}
                            src={item}
                            alt="gallery"
                            className=" bdrs12 pointer slider-item-image community-single-page-slider-image-item"
                            style={{height: "auto"}}
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
          <button className="custom-prev-btn sliderbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button className="custom-next-btn sliderbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="row">
          <div
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={"auto"}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt20"
            >
              {embedVideo && (
                <SwiperSlide style={{height: "90px", width: "130px"}}>
                  <div
                    className="h-auto bdrs12 pointer videoEmbed-thumb overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: embedVideo }}
                  />
                </SwiperSlide>
              )}
              {thumbnail && (
                <SwiperSlide style={{height: "90px", width: "130px"}}>
                  <Image
                    // height={90}
                    // width={83}
                    fill
                    objectFit="cover"
                    src={thumbnail}
                    alt="image"
                    className="bdrs12 cover pointer"
                  />
                </SwiperSlide>
              )}

              {images.map(
                (item, i) =>
                  item != thumbnail && (
                    <SwiperSlide key={i} style={{height: "90px", width: "130px"}}>
                      <Image
                        // height={90}
                        // width={83}
                        fill
                        objectFit="cover"
                        src={item}
                        alt="image"
                        className="bdrs12 cover pointer"
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
