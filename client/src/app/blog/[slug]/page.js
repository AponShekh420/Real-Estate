import Details from "@/components/single-post/Details";
import Features from "@/components/single-post/Features";
import Pagination from "@/components/single-post/Pagination";
import ReviewBoxForm from "@/components/single-post/ReviewBoxForm";
import Social from "@/components/single-post/Social";
import Tags from "@/components/single-post/Tags";
import TopComments from "@/components/single-post/TopComments";
import AllReviews from "@/components/single-post/reviews";
import Blog from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Image from "next/image";
import getSingleBlog from "@/lib/getSingleBlog";
import ReadMore from "@/components/common/ReadMore";
import StringToDomComponent from "@/components/common/StringToDomComponent";

export const metadata = {
  title: "Blog Single  || Homez - Real Estate NextJS Template",
};

const BlogSingle = async ({params}) => {

  const {slug} = params;

    // get single community data from api
    const res = await getSingleBlog(slug)
    // if the data has not founded, that's mean the route are wrong, so redirect on not found page
    if(slug !==undefined && !res) {
      notFound();
    }

    console.log(res)

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Blog Section Area */}
      <section className="our-blog pt50">

        <Details  id={params.id} data={res}/>
       


        <div className="container">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
              <StringToDomComponent htmlString={res?.desc} />

              <div className="bdrt1 bdrb1 d-block d-sm-flex justify-content-between pt50 pt30-sm pb50 pb30-sm">
                <div className="blog_post_share d-flex align-items-center mb10-sm">
                  <span className="mr30">Share this post</span>
                  <Social />
                </div>
                <div className="bsp_tags d-flex">
                  <Tags />
                </div>
              </div>
              {/* End share social and tags */}

              <TopComments />
              {/* End TopComments */}

              <Pagination />
              {/* End Blog Single pagination */}

              <AllReviews />
              {/* End  AllReviews */}

              <div className="bsp_reveiw_wrt">
                <h6 className="fz17">Leave A Review</h6>
                <ReviewBoxForm />
              </div>
              {/* End ReviewBoxForm */}
            </div>
          </div>
        </div>
      </section>
      {/* End Blog Details */}

      {/* Related Blog Post */}
      <section className="pb90 pb20-md pt-0">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="main-title text-start text-md-center">
                <h2 className="title">Related Posts</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section>
      {/* end Related Blog Post */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BlogSingle;
