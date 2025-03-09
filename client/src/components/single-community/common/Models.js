"use client";
import { checkFileExtByUrl } from "@/utilis/checkFileExtByUrl";
import Image from "next/image";
import "./model.css";

const Models = ({ modelsData }) => {
  const handleDownload = (imageUrl) => {
    if (!imageUrl) {
      return true;
    }
    const splitImage = imageUrl.split("/");
    const filename = splitImage[splitImage.length - 1];

    // Fetch the image as a blob
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch((err) => console.error("Error downloading image:", err));
  };
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
                <div className="single-img mb30-sm ">
                  {checkFileExtByUrl(element?.img) === "pdf" ? (
                    <div
                      className="pdf_container"
                      style={{
                        width: "120px",
                        height: "120px",
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        src={element?.img}
                        width="120px"
                        height="120px"
                        style={{
                          width: "200px",
                          transform: "translate(-24px, -1px)",
                        }}
                      ></iframe>
                    </div>
                  ) : (
                    <Image
                      width={120}
                      height={120}
                      className="w70 mx-auto d-block rounded object-fit-cover"
                      src={element?.img}
                      alt="agent"
                    />
                  )}
                </div>
                <div className="single-contant text-center">
                  <h5
                    style={{ color: "#185283", fontSize: "0.8rem" }}
                    className=" text-capitalize title-text"
                  >
                    {element?.name}
                  </h5>
                  <div className="agent-meta content-wrapper">
                    {element?.bedrooms ? (
                      <span className="py-0 d-block property-text">
                        {element?.bedrooms} Bedroom
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.bathrooms ? (
                      <span className="py-0 d-block property-text">
                        {element?.bathrooms} Bathrooms
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.garage ? (
                      <span className="py-0 d-block property-text">
                        {element?.garage} Garage
                      </span>
                    ) : (
                      ""
                    )}
                    {element?.squareFit ? (
                      <span className="py-0 d-block property-text">
                        {element?.squareFit} sq. ft
                      </span>
                    ) : (
                      ""
                    )}
                    <p className="desc-text">{element?.desc}</p>
                  </div>
                </div>

                <button
                  style={{
                    width: "fit-content",
                    fontSize: "10px",
                  }}
                  className={`text-uppercase fw-bold  mx-auto d-block link `}
                  onClick={() => handleDownload(element?.img)}
                >
                  Download Floor Plan
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Models;
