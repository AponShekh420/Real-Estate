import Pagination from "@/components/results/Pagination";
import Footer from "@/components/common/default-footer";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Sidebar from "@/components/results/sidebar/index";
import TopFilterBar from "@/components/results/TopFilterBar";
import TopFilterBar2 from "@/components/results/TopFilterBar2";
import AdvanceFilterModal from "@/components/common/advance-filter";
import SearchBar from "@/components/results/SearchBar";
const page = () => {
  return (
    <div className="bgc-f7">
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}


      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}


      <section className="pt50 pb25 pb15-md">
        <div className="container">
         <TopFilterBar />
        </div>
      </section>

      <section className="pt0 pb0 mb0 d-block d-lg-none">
        <div className="container">
          {/* mobile filter and advance search */}
          <div className="result-advance-filter w-100 position-relative">
            <a
              className="filter-btn-left mobile-filter-btn d-block mt0 mobile-filter-btn-results-page"
              data-bs-toggle="offcanvas"
              href="#listingSidebarFilter"
              role="button"
              aria-controls="listingSidebarFilter"
              style={{fontWeight: "500"}}
            >
              <span className="flaticon-settings" style={{fontWeight: "500"}}/> Filter
            </a>

            <div className="dropdown-lists">
              <ul className="p-0 mb-0">
                <li className="list-inline-item">
                  {/* Advance Features modal trigger */}
                  <a
                    type="button"
                    className="open-btn mb15"
                    style={{position: "top 20px"}}
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal"
                  >
                    <i className="flaticon-settings me-2" /> Advance Filter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="result-advance-filter" style={{paddingTop: "20px"}}>
            
          </div> */}
        </div>
      </section>


      <section className="pt0 pb90">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4 d-none d-lg-block">
              <Sidebar />
            </div>
            {/* End .col-lg-4 */}

            {/* start mobile filter sidebar */}
            <div
              className="offcanvas offcanvas-start p-0"
              tabIndex="-1"
              id="listingSidebarFilter"
              aria-labelledby="listingSidebarFilterLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body p-0">
                <Sidebar />
              </div>
            </div>
            {/* End mobile filter sidebar */}

            <div className="col-lg-8">
              {/* <div className="row align-items-center mb20">
                <TopFilterBar />
              </div> */}
              {/* End TopFilterBar */}

              <div className="row mt15">
                {/* <FeaturedListings state={state} city={city} area={area}/> */}
                <SearchBar/>
              </div>
              {/* End .row */}

              <div className="row mt20">
                <Pagination 
                  // currentPage={currentPage}
                  // setCurrentPage={setCurrentPage}
                  // totalPages={totalPages}
                  // data={communitiesData}
                />
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>


    {/* Start Our Footer */}
    <section className="footer-style1 pt60 pb-0">
      <Footer />
    </section>
    {/* End Our Footer */}
    </div>
  );
}

export default page;