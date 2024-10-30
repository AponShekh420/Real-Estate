import MobileMenu from "@/components/common/mobile-menu";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import AllStatesList from "@/components/states/AllStatesList";


export const metadata = {
  title: "States || Real Estate NextJS Template",
};

const States = () => {

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Explore property-city */}
      <section className="pb40-md pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider position-relative">
                <AllStatesList />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default States;
