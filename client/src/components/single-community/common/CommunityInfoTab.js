import Amenities from "./Amenities";

const CommunityInfoTab = ({data}) => {
  

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <nav>
          <div className="nav nav-tabs mb20" id="nav-tab2" role="tablist">
              <button
              className={`nav-link fw600 active`}
              id={`nav-item1-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#nav-item1`}
              type="button"
              role="tab"
              aria-controls={`nav-item1`}
              aria-selected={"true"}
              >
                Overview
              </button>
              {data?.amenities?.length > 0 ? (
                <button
                  className={`nav-link fw600`}
                  id={`nav-item2-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#nav-item2`}
                  type="button"
                  role="tab"
                  aria-controls={`nav-item2`}
                  aria-selected={"false"}
                >
                  Amenities
                </button>
                ): null}
              <button
                className={`nav-link fw600`}
                id={`nav-item3-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-item3`}
                type="button"
                role="tab"
                aria-controls={`nav-item3`}
                aria-selected={"false"}
              >
                Models
              </button>
          </div>
        </nav>
        {/* End nav tabs */}

        <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade fz15 active show`}
              id={`nav-item1`}
              role="tabpanel"
              aria-labelledby={`nav-item1-tab`}
            >
              <h1>hello</h1>
            </div>

            {/* amenities */}
            {data?.amenities?.length > 0 ? (
              <div
                className={`tab-pane fade fz15`}
                id={`nav-item2`}
                role="tabpanel"
                aria-labelledby={`nav-item2-tab`}
              >
                <div className="row">
                  <Amenities data={data}/>
                </div>
              </div>
            ): null}

            {/* models */}
            <div
              className={`tab-pane fade fz15`}
              id={`nav-item3`}
              role="tabpanel"
              aria-labelledby={`nav-item3-tab`}
            >
              <h1>Models</h1>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfoTab;
