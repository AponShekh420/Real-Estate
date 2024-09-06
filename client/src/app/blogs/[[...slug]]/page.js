import Pagination from "@/components/blogs/Pagination";
import Blog from "@/components/blogs/Blog";
import BlogSidebar from "@/components/blogs/sidebar";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import getCatagoryData from "@/lib/getCatagoryData";
import store from "@/redux/store";
import { removeBlogFilterValues } from "@/redux/blogFilterSlice";
import { notFound } from "next/navigation";
import Breadcumb from "@/components/blogs/Breadcumb";

export const metadata = {
  title: "Blog List v2  || Homez - Real Estate NextJS Template",
};

const Blogs = async ({params}) => {
  const {slug} = params;

  // that would be redirect on notFound page if the slug params are more then 3, like state/city/area/notfound??
  if(slug?.length > 2 && slug !== undefined) {
    notFound();
  }

  // get location data like description, name etc from api
  const res = await getCatagoryData(params)
  let desc = res?.data?.desc;


  // has add the data on redux after fetching from backend
  if(slug !==undefined && !res?.data) {
    // if the data has not founded, that's mean the route are wrong, so redirect on not found page
    store.dispatch(removeBlogFilterValues())
    notFound();
  }



  return (
    <div className="bgc-f7">
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Blog</h2>
                <Breadcumb/>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Start */}

      {/* Blog Section Area */}
      <section className="our-blog pt-0">
        <div className="container">
          <div className="row mt20">
            <div className="col-lg-8">
              <Blog blogFilter={store.getState().blogFilter}/>
              <div className="row">
                <div className="mbp_pagination text-center">
                  <Pagination />
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}

            <div className="col-lg-4">
              <BlogSidebar />
            </div>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default Blogs;
