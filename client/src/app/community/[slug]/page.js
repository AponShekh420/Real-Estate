// "use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/single-community/common/EnergyClass";
import FloorPlans from "@/components/single-community/common/FloorPlans";
import HomeValueChart from "@/components/single-community/common/HomeValueChart";
import NearbySimilarProperty from "@/components/single-community/common/NearbySimilarProperty";
import OverView from "@/components/single-community/common/OverView";
import PropertyAddress from "@/components/single-community/common/CommunityAddress";
import PropertyDetails from "@/components/single-community/common/CommunityDetails";
import PropertyHeader from "@/components/single-community/common/CommunityHeader";
import CommunityInfoTab from "@/components/single-community/common/CommunityInfoTab";
import PropertyVideo from "@/components/single-community/common/PropertyVideo";
import PropertyViews from "@/components/single-community/common/property-view";
import CommunityDescriptions from "@/components/single-community/common/CommunityDescriptions";
import ReviewBoxForm from "@/components/single-community/common/ReviewBoxForm";
import VirtualTour360 from "@/components/single-community/common/VirtualTour360";
import AllReviews from "@/components/single-community/common/reviews";
import ScheduleTour from "@/components/single-community/sidebar/ScheduleTour";
import PropertyGallery from "@/components/single-community/single-v8/PropertyGallery";
import React from "react";
import MortgageCalculator from "@/components/single-community/common/MortgageCalculator";
import WalkScore from "@/components/single-community/common/WalkScore";
import getSingleCommunity from "@/lib/getSingleCommunity";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Property Single V6 || Homez - Real Estate NextJS Template",
};

const SingleCommunity = async ({ params }) => {

    const {slug} = params;

    // get single community data from api
    const res = await getSingleCommunity(slug)
    // if the data has not founded, that's mean the route are wrong, so redirect on not found page
    if(slug !==undefined && !res) {
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

      {/* Property All Single  */}
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <PropertyHeader id={params.id} data={res}/>
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              <PropertyGallery id={params.id} data={res}/>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <CommunityInfoTab data={res}/>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <PropertyAddress data={res}/>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  {/* <AllComments /> */}
                  <AllReviews data={res}/>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Leave A Review</h4>
                <div className="row">
                  <ReviewBoxForm data={res}/>
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Get More Information</h4>
                  <p className="text">We can provide additional details or help you schedule a tour</p>
                  <ScheduleTour data={res}/>
                </div>
                {/* End .get more */}
              </div>
            </div>
          </div>
          {/* End .row */}

        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single   */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleCommunity;
