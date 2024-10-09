import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";
import React from "react";

const CommunityDetails = ({data}) => {
  const columns = [
    [
      {
        label: "Price Range",
        value: `$${data.minPrice} - $${data.maxPrice}`,
      },
      {
        label: "Size",
        value: `${data.communitySize}`,
      },
      {
        label: "Age Restrictions",
        value: data.ageRestrictions ? "55+" : "N/A",
      },
      {
        label: "Gated",
        value: data.gated ? "Yes" : "No",
      },
      {
        label: "Construction Dates",
        value: data.builtEnd != "Present" ? `${data.builtStart.split("-")[0]} - ${data.builtEnd.split("-")[0]}` : "New Construction",
      },
      {
        label: "Home Types",
        value: data?.homeTypes?.join(", "),
      },
    ],
  ];

  return (
    <div className="row mb35">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-12`}
        >
          {column.map((detail, index) => (
            detail.label == "Price Range" ? (
              <div key={index} className="d-flex justify-content-between bdrb1">
                <div className="pd-list">
                  <p className="fw600 mb0 py5 ff-heading dark-color">
                    {detail.label}:
                  </p>
                </div>
                <div className="pd-list">
                  <p className="text mb0 py5 text-end">
                    <CommunityMinMaxPrice data={data}/>
                  </p>
                </div>
              </div>
            ) : (
              <div key={index} className="d-flex justify-content-between bdrb1">
                <div className="pd-list">
                  <p className="fw600 mb0 py5 ff-heading dark-color">
                    {detail.label}:
                  </p>
                </div>
                <div className="pd-list">
                  <p className="text mb0 py5 text-end">{detail.value}</p>
                </div>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommunityDetails;
