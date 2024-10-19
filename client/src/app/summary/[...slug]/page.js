import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import React from "react";
import PropertyFiltering from "@/components/summary/PropertyFiltering";
import { notFound } from "next/navigation";
import getLocationData from "@/lib/getLocationData";
import ReadMore from "@/components/common/ReadMore";
import store from "@/redux/store";
import { removeCommunityFilterValues } from "@/redux/communityFilterSlice";
import Breadcumb from "@/components/summary/Breadcumb";
import ListingMap from "@/components/summary/ListingMap";
import TopFilterBar2 from "@/components/summary/TopFilterBar2";
import AdvanceFilterModal from "@/components/common/advance-filter";
import StringToDomComponent from "@/components/common/StringToDomComponent";
import "@/components/common/quillEditorTextStyle.css";


export const metadata = {
  title: "55 home || summary",
};

const SummaryPage = async ({params}) => {
  const {slug} = params;

  // that would be redirect on notFound page if the slug params are more then 3, like state/city/area/notfound??
  if(slug?.length > 3 && slug !== undefined) {
    notFound();
  }

  // get location data like description, name etc from api
  const res = await getLocationData(params)
  let desc = res?.data?.desc;


  // has add the data on redux after fetching from backend
  if(slug !==undefined && !res?.data) {
    // if the data has not founded, that's mean the route are wrong, so redirect on not found page
    store.dispatch(removeCommunityFilterValues())
    notFound();
  }



  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="advance-search-menu style2 position-relative pt15 pb5 bb1 dn-992">
        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal/>
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="advance-search-list at-1col-v2 no-box-shadow d-flex justify-content-between">
                <div className="dropdown-lists">
                  <ul className="p-0 mb-0">
                    <TopFilterBar2 />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Advance Search */}


      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-capitalize">Top {res?.data?.name} Retirement Communities</h2>
                <Breadcumb/>
                <div className="quillEditorTextHandler mt25">
                  <StringToDomComponent htmlString={res?.data?.desc} />
                </div>
                {/* {res?.data?.desc ? <ReadMore desc={res?.data?.desc}/> : null} */}
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <PropertyFiltering communityFilter={store.getState().communityFilter}/>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SummaryPage;
