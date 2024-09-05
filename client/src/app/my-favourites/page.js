import MobileMenu from "@/components/common/mobile-menu";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import Container from "@/components/my-favourites/Container";
import getWishlist from "@/lib/getWishlist";


export const metadata = {
  title: "Wislist || Real Estate NextJS Template",
};

const myFavourites = async () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row align-items-center pb40">
                <h2>My Favourites</h2>
                <p className="text">We are glad to see you again!</p>
              </div>
              <Container/>
            </div>
          </div>
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

export default myFavourites;
