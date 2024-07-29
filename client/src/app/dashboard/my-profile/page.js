import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/dashboard/DboardMobileNavigation";
import Footer from "@/components/dashboard/Footer";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import ChangePasswordForm from "@/components/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/dashboard/dashboard-profile/PersonalInfo";
import ProfileBox from "@/components/dashboard/dashboard-profile/ProfileBox";
import SocialField from "@/components/dashboard/dashboard-profile/SocialField";
import store from "@/redux/store";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard My Profile || Homez - Real Estate NextJS Template",
};

const DashboardMyProfile = () => {
  const {user} = store.getState();


  if(!user) {
    redirect("/")
  }


  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Profile</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="col-xl-7">
                      <ProfileBox />
                    </div>
                    {/* End ProfileBox */}

                    <div className="col-lg-12">
                      <PersonalInfo />
                    </div>
                    {/* End PersonalInfo */}
                  </div>
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Social Media</h4>
                    <SocialField />
                  </div>
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Change password</h4>
                    <ChangePasswordForm />
                  </div>
                  {/* End .ps-widget */}
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyProfile;
