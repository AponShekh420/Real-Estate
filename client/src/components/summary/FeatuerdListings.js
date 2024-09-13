"use client";

import getCommunities from "@/lib/getCommunities";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import CommunitiesListLoader from "./CommunitiesListLoader";
import Wishlist from "./Wishlist";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const FeaturedListings = ({state: stateProps, city: cityProps, area: areaProps}) => {
  
  // redux
  const dispatch = useDispatch();
  const { state, area, city, homeTypes, status, data, loading, currentPage, amenities, ageRestrictions, gated, price } = useSelector(state => state.communityFilter);

  useEffect(()=> {
    dispatch(addCommunityFilterValue({
      state: stateProps,
      city: cityProps,
      area: areaProps
    }))
    getCommunities()
    // console.log("titleSearch:", titleSearch)
  }, [state, city, area, status, homeTypes, currentPage, amenities, ageRestrictions, gated, price])



  return (
    <>
      {loading ? (
        <CommunitiesListLoader/>
      ) : (data.length > 0) ? (
        data.map((listing) => (
          <div className={`col-sm-6 col-lg-6`} key={listing.id}>
            <div className={"listing-style1"}    >
              <div className="list-thumb" >
                <Image
                  width={382}
                  height={248}
                  style={{height:'230px'}}
                  className="w-100  cover"
                  src={listing?.thumbnail ? `${process.env.SERVER_IMG_PATH}/assets/communityImgs/${listing?.thumbnail}` : `${process.env.SERVER_IMG_PATH}/assets/communityImgs/${listing?.imgs[listing?.imgs?.length -1]}`}
                  alt="listings"
                />
                <div className="sale-sticker-wrap">
                  {!listing?.status?.includes("Rent") && (
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      FEATURED
                    </div>
                  )}
                </div>
  
                <div className="list-price">
                  ${listing.minPrice} <span>-</span> ${listing.maxPrice}
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link  href={`/community/${listing.slug}`}>{listing.title}</Link>
                </h6>
                <p className="list-text">{listing.location}</p>
                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing?.bed} bed
                  </a>
                  <a href="#">
                    <span className="flaticon-shower" /> {listing?.bath} bath
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing?.sqft} sqft
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">For {listing?.status.map((item, index) => (listing.status.length > (index + 1)) ? `${item}/`: item)}</span>
                  <div className="icons d-flex align-items-center">
                    <Link href={`/community/${listing.slug}`}>
                      <span className="flaticon-fullscreen" />
                    </Link>
                    <Wishlist listing={listing}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <h1 style={{height: "600px"}} className="d-flex align-items-center justify-content-center">No Data Found</h1>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
