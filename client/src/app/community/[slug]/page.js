// "use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyHeader from "@/components/single-community/common/CommunityHeader";
import CommunityInfoTab from "@/components/single-community/common/CommunityInfoTab";
import ReviewBoxForm from "@/components/single-community/common/ReviewBoxForm";
import AllReviews from "@/components/single-community/common/reviews";
import ScheduleTour from "@/components/single-community/sidebar/ScheduleTour";
import PropertyGallery from "@/components/single-community/single-v8/PropertyGallery";
import getSingleCommunity from "@/lib/getSingleCommunity";
import { notFound } from "next/navigation";

// add meta data for each community post
export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  // get single community data from api
  const res = await getSingleCommunity(slug);

  // if the data has not founded, that's mean the route are wrong, so redirect on not found page
  if (slug !== undefined && !res) {
    notFound();
  }

  const { title, desc, metaTitle, metaDesc, thumbnail, imgs } = res;

  return {
    title: metaTitle || title,
    description: metaDesc || desc,
    openGraph: {
      title: metaTitle || title,
      description: metaDesc || desc,
      images: [
        {
          url: thumbnail || imgs[imgs.length - 1], // The image you want to display
          alt: metaTitle || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description: metaDesc || desc,
      images: {
        url: thumbnail || imgs[imgs.length - 1],
        alt: metaTitle || title,
      }, // Twitter-specific image
    },
  };
};

const SingleCommunity = async ({ params }) => {
  const { slug } = params;

  // get single community data from api
  const res = await getSingleCommunity(slug);
  // if the data has not founded, that's mean the route are wrong, so redirect on not found page
  if (slug !== undefined && !res) {
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
            <PropertyHeader id={params.id} data={res} />
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              <PropertyGallery id={params.id} data={res} />

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <CommunityInfoTab data={res} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <AllComments /> */}
              <AllReviews data={res} />

              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Leave A Review</h4>
                <div className="row">
                  <ReviewBoxForm data={res} />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Get More Information</h4>
                  <p className="text">
                    We can provide additional details or help you schedule a
                    tour
                  </p>
                  <ScheduleTour data={res} />
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
