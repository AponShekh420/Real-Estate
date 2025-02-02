"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import CommunityMinMaxPrice from "../common/CommunityMinMaxPrice";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const ListingsFavourites = ({data, currentPage, loading, setNotify}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);


  const handleDeleteListing = async (communityId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/wishlist/toggle`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          communityId,
        })
      });
      const resData = await res.json();
      setDeleteLoading(false);
      if(resData?.msg) {
        setNotify(Math.random() * 100)
      }
    } catch(err) {
      console.log(err.message)
    }
  } 


  return (
    <>
      {data?.communities?.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center p95">
          <h3>No items available.</h3>
        </div>
      ) : (
        data?.communities?.slice((currentPage - 1 ) * 10, currentPage * 10).map((listing) => (
          <div className="col-md-6 col-lg-4 col-xl-3" key={listing.id}>
            <div className="listing-style1 style2">
              <div className="list-thumb" >
                <Link href={`/community/${listing.slug}`}>
                  <Image
                    width={382}
                    height={248}
                    style={{height:'230px'}}
                    className="w-100  cover"
                    src={listing?.thumbnail || listing?.imgs[listing?.imgs?.length -1]}
                    alt="listings"
                  />
                </Link>
                <button
                  className="tag-del"
                  title="Delete Item"
                  onClick={() => handleDeleteListing(listing._id)}
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing._id}`}
                >
                  {deleteLoading ? (
                    <MoonLoader
                      color="red"
                      loading={deleteLoading}
                      cssOverride={override}
                      size={14}
                      className="d-flex"
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (<span className="fas fa-trash-can"></span>)}
                </button>

                <ReactTooltip
                  id={`delete-${listing._id}`}
                  place="left"
                  content="Delete"
                />
  
                <div className="list-price">
                  <CommunityMinMaxPrice data={listing}/>
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/community/${listing.slug}`}>{listing.title}</Link>
                </h6>
                <p className="list-text">{listing.location}</p>
                {/* <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing?.bed} bed
                  </a>
                  <a href="#">
                    <span className="flaticon-shower" /> {listing?.bath} bath
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing?.sqft} sqft
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ListingsFavourites;
