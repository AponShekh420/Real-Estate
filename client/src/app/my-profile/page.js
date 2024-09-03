import MobileMenu from "@/components/common/mobile-menu";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MyProfile from "@/components/common/my-profile";
import { getSession } from "@/lib/authLib";
import { redirect } from "next/navigation";


export const metadata = {
  title: "My Profile || Real Estate NextJS Template",
};

const page = async () => {

  const user = await getSession();

  if(user?.role == "admin" || user?.role == "contributor" || !user) {
    redirect("/")
  } else {
    // nothing to do
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
              <div className="row align-items-center pb40">
                <h2>My Profile</h2>
                <p className="text">We are glad to see you again!</p>
              </div>
              <div className="breadcumb-style1">
                <MyProfile user={user}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default page;
