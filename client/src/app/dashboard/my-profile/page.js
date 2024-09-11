import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/dashboard/DboardMobileNavigation";
import Footer from "@/components/dashboard/Footer";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import { getSession } from "@/lib/authLib";
import { redirect } from "next/navigation";
import MyProfile from "@/components/common/my-profile";

export const metadata = {
  title: "Dashboard My Profile || Homez - Real Estate NextJS Template",
};

const DashboardMyProfile = async () => {
  const user = await getSession();

  if(user.role == "admin" || user.role == "contributor") {
    // nothing
  } else {
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
          <SidebarDashboard user={user} />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation user={user}/>
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

              <MyProfile user={user}/>
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
