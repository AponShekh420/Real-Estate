import Image from "next/image";
import styles from "./model.module.css";
const Models = ({ modelsData }) => {
  return (
    <div className="row mb30 g-4">
      {modelsData
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((element, index) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 "
            key={index}
          >
            <div
              style={{ background: "#f1f1f1", borderRadius: "7px" }}
              className={`ps-widget default-box-shadow2 py-4`}
            >
              <div className="agent-single  pb0">
                <div className="single-img mb30-sm">
                  <Image
                    width={120}
                    height={120}
                    className="w70 mx-auto d-block rounded"
                    src={element?.img}
                    alt="agent"
                  />
                </div>
                <div className="single-contant text-center">
                  <h5
                    style={{ color: "#185283", fontSize: "1rem" }}
                    className=" my-3 text-capitalize"
                  >
                    {element?.name}
                  </h5>
                  <div className="agent-meta">
                    {element?.bedrooms ? (
                      <span className="py-0 d-block">
                        {element?.bedrooms} Bedroom
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.bathrooms ? (
                      <span className="py-0 d-block">
                        {element?.bathrooms} Bathrooms
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.garage ? (
                      <span className="py-0 d-block">
                        {element?.garage} Garage
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.squareFit ? (
                      <span className="py-0 d-block">
                        {element?.squareFit} sq. ft
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <a
                  style={{
                    width: "fit-content",
                    fontSize: "0.8rem",
                  }}
                  className={`text-uppercase fw-bold  mx-auto d-block mt-3    ${styles.link}`}
                  href={element?.img}
                >
                  Download pdf
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Models;
