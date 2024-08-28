import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/dashboard/DboardMobileNavigation";
import Footer from "@/components/dashboard/Footer";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import TabAndHeader from "@/components/dashboard/dashboard-location/TabAndHeader";
import { getSession } from "@/lib/authLib";
import store from "@/redux/store";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Dashboard Add Property || Homez - Real Estate NextJS Template",
};

const DashboardAddLocation = async () => {
  const user = await getSession();


  if(user.role !== "admin") {
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
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard user={user}/>
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              <div className="row pb40 d-block d-lg-none">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <TabAndHeader/>
            </div>
            {/* End dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardAddLocation;
