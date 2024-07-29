import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/dashboard/Footer";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import DboardMobileNavigation from "@/components/dashboard/DboardMobileNavigation";
import Container from "@/components/dashboard/dashboard-blogs/Container";
import AuthCheck from "@/utilis/AuthCheck";
import { redirect } from "next/navigation";
import store from "@/redux/store";

export const metadata = {
  title: "Dashboard Properties || Homez - Real Estate NextJS Template",
};

const DashboardMyBlogs = () => {
  const {user} = store.getState();

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

              <Container/>
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

export default DashboardMyBlogs;
