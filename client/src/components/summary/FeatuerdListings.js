"use client";

import getCommunities from "@/lib/getCommunities";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityMinMaxPrice from "../common/CommunityMinMaxPrice";
import CommunitiesListLoader from "./CommunitiesListLoader";
import Wishlist from "./Wishlist";
import styles from "./featuredListing.module.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const FeaturedListings = ({
  state: stateProps,
  city: cityProps,
  area: areaProps,
}) => {
  // redux
  const dispatch = useDispatch();
  const {
    state,
    area,
    city,
    homeTypes,
    status,
    data,
    loading,
    currentPage,
    amenities,
    ageRestrictions,
    gated,
    price,
    sorting,
    isNewContraction,
    closestHospital,
    closestAirport,
    closestMilitaryBase,
    builder,
  } = useSelector((state) => state.communityFilter);

  useEffect(() => {
    dispatch(
      addCommunityFilterValue({
        state: stateProps,
        city: cityProps,
        area: areaProps,
      })
    );
    getCommunities();
    // console.log("titleSearch:", titleSearch)
  }, [
    state,
    city,
    area,
    status,
    homeTypes,
    currentPage,
    amenities,
    ageRestrictions,
    gated,
    price,
    sorting,
    isNewContraction,
    closestHospital,
    closestAirport,
    closestMilitaryBase,
    builder,
  ]);

  const builtChecker = (cdata) => {
    if (cdata?.builtStart && cdata?.builtEnd) {
      return (
        <span>
          <span className="fa-light fa-calendar-days" />
          Built:{" "}
          {`${cdata.builtStart.split("-")[0]} - ${
            cdata.builtEnd.split("-")[0]
          }`}
        </span>
      );
    } else if (cdata?.builtStart && !cdata?.builtEnd) {
      return (
        <span>
          <span className="fa-light fa-calendar-days" />
          Built: {`${cdata.builtStart.split("-")[0]} - Current`}
        </span>
      );
    } else if (cdata?.builtEnd && !cdata?.builtStart) {
      return (
        <span>
          <span className="fa-light fa-calendar-days" />
          Built: {`Completed ${cdata.builtEnd.split("-")[0]}`}
        </span>
      );
    } else {
      return "";
    }
  };
  return (
    <>
      {loading ? (
        <CommunitiesListLoader />
      ) : data.length > 0 ? (
        data.map((listing) => (
          <div className={`col-sm-6 col-lg-6`} key={listing.id}>
            <div className={"listing-style1"}>
              <div className="list-thumb">
                <Link href={`/community/${listing.slug}`}>
                  {listing?.embedVideo ? (
                    <div
                      className={`w-100  cover ${styles.embedvideo}`}
                      dangerouslySetInnerHTML={{ __html: listing?.embedVideo }}
                    />
                  ) : (
                    <Image
                      width={382}
                      height={248}
                      style={{ height: "230px" }}
                      className="w-100  cover"
                      src={
                        listing?.thumbnail ||
                        listing?.imgs[listing?.imgs?.length - 1]
                      }
                      alt="listings"
                    />
                  )}
                  {listing.minPrice || listing.maxPrice ? (
                    <div className="list-price">
                      <CommunityMinMaxPrice data={listing} />
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
              <div className="list-content">
                <Link href={`/community/${listing.slug}`} className="w-100">
                  <>
                    <h6 className="list-title">
                      <span>{listing.title}</span>
                    </h6>
                    <p className="list-text">{listing.location}</p>
                    <div className="list-meta d-flex align-items-center flex-wrap gap-2">
                      {listing?.ageRestrictions === null ? (
                        ""
                      ) : (
                        <span>
                          <span className="fa-thin fa-person" />
                          Age Restricted:{" "}
                          {listing?.ageRestrictions ? "Yes" : "No"}
                        </span>
                      )}
                      {listing?.gated == null ? (
                        ""
                      ) : (
                        <span>
                          <span className="fa-sharp fa-light fa-torii-gate" />
                          Gated: {listing?.gated ? "Yes" : "No"}
                        </span>
                      )}

                      {builtChecker(listing)}

                      {listing?.communitySize ? (
                        <span>
                          <span className="fa-light fa-sitemap" />
                          Size: {listing?.communitySize}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <hr className="mt-2 mb-2" />
                  </>
                </Link>
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">
                    {/*here would be the buttom oparation*/}
                  </span>
                  {/* For {listing?.status.map((item, index) => (listing.status.length > (index + 1)) ? `${item}/`: item)} */}
                  <div className="icons d-flex align-items-end h-100 pointer">
                    <Wishlist data={listing} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <h1
            style={{ height: "600px" }}
            className="d-flex align-items-center justify-content-center"
          >
            No Data Found
          </h1>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
