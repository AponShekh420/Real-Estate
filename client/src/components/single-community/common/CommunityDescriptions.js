"use client";

const CommunityDescriptions = ({ data }) => {
  return (
    <div>
      <div
        className={`text mb10 `}
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
      />
      {/* <div className="agent-single-accordion">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
              style={{}}
            >
              <div className="accordion-body p-0">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                  className="text"
                ></div>
              </div>
            </div>
            {data?.description?.length > 300 ? (
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  onClick={() => setShowMore((prev) => !prev)}
                  className="accordion-button p-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Show more
                </button>
              </h2>
            ) : null}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CommunityDescriptions;
