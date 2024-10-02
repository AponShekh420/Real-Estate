import MobileMenu from "@/components/common/mobile-menu";
import DefaultHeader from "@/components/common/DefaultHeader";
import Hero from "@/components/home/hero";
import Features from "@/components/home/Features";
import Link from "next/link";
import Footer from "@/components/common/default-footer";
import RecentBlogs from "@/components/home/RecentBlogs";
import StateList from "@/components/home/StateList";
import CommunityByStates from "@/components/home/CommunityByStates";


export const metadata = {
  title: "Home || Real Estate NextJS Template",
};

const Home = () => {

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V1 */}
      <section className="home-banner-style4 p0 bgc-white">
        <div className="home-style4 maxw1600 bdrs24 position-relative mx-auto mx20-lg" style={{height: "100%"}}>
          <div className="container py50">
            <div className="row">
              <div className="col-xl-9">
                <Hero />
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V4 */}

      {/* Explore property-city */}
      <section className="pb40-md pb90">
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">Popular 55+ Destinations</h2>
              </div>
            </div>
            {/* End col-lg-9 */}

            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/summary">
                  View All
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
            {/* End col-lg-3 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <CommunityByStates />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Explore property-city */}

      <section className="pt-0 pb60">
        <div className="container" data-aos="fade-up" data-aos-delay="300">
          <div className="main-title2">
            <h2 className="title">Useful Information for 55 and Over Shoppers</h2>
          </div>
          <RecentBlogs blogsCatagory={null} total={6} dateStatus={true} notCatagory={"66a55dd8d0c49928d7845d12"}/>
          <RecentBlogs blogsCatagory={"66a55dd8d0c49928d7845d12"} total={3} dateStatus={false} notCatagory={""}/>
        </div>
      </section>

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Let’s Find the Right Community<br className="d-none d-md-block" />{" "}
                    for Your Retirement
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                <Link href="/about" className="ud-btn btn-dark">
                  Learn More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      <section className="pb-0 pt30">
        <StateList />
      </section>
      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home;
