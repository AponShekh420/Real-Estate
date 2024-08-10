// import listings from "@/data/listings";
import ListingSidebar from "./sidebar";
// import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";

// import PaginationTwo from "./PaginationTwo";

export default function PropertyFiltering({communityFilter}) {
  const {state, city, area} = communityFilter;
  
  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-4 d-none d-lg-block">
            <ListingSidebar />
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
              <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                Listing Filter
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body p-0">
              <ListingSidebar />
            </div>
          </div>
          {/* End mobile filter sidebar */}

          <div className="col-lg-8">
            <div className="row align-items-center mb20">
              {/* <TopFilterBar
                pageContentTrac={pageContentTrac}
                colstyle={colstyle}
                setColstyle={setColstyle}
                setCurrentSortingOption={setCurrentSortingOption}
              /> */}
            </div>
            {/* End TopFilterBar */}

            <div className="row mt15">
              <FeaturedListings state={state} city={city} area={area}/>
            </div>
            {/* End .row */}

            <div className="row">
              {/* <PaginationTwo
                pageCapacity={8}
                data={sortedFilteredData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              /> */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-lg-8 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
