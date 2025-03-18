import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";

const CommunityDetails = ({ data }) => {
  const columns = [];
  if (data.minPrice || data.maxPrice) {
    columns.push({
      label: "Price Range",
      value: `$${data.minPrice} - $${data.maxPrice}`,
      position: "left",
    });
  }
  if (data?.gated !== null) {
    columns.push({
      label: "Gated",
      value: data.gated ? "Yes" : "No",
      position: "right",
    });
  }
  if (data.communitySize > 0) {
    columns.push({
      label: "Size",
      value: `${data.communitySize} Homes`,
      position: "left",
    });
  }
  if (data?.ageRestrictions !== null) {
    columns.push({
      label: "Age Restrictions",
      value: data.ageRestrictions ? "55+" : "No",
      position: "right",
    });
  }
  if (data?.builtStart && data?.builtEnd) {
    columns.push({
      label: "Construction Dates",
      value: `${data.builtStart.split("-")[0]} - ${
        data.builtEnd.split("-")[0]
      }`,
      position: "left",
    });
  }
  if (data?.builtStart && !data?.builtEnd) {
    columns.push({
      label: "Construction Dates",
      value: `${data.builtStart.split("-")[0]} - Current`,
      position: "left",
    });
  }
  if (data?.builtEnd && !data?.builtStart) {
    columns.push({
      label: "Construction Dates",
      value: `Completed ${data.builtEnd.split("-")[0]}`,
      position: "left",
    });
  }

  if (data?.county) {
    columns.push({
      label: "County",
      value: data.county,
      position: "right",
    });
  }

  if (data?.homeTypes?.length > 0) {
    columns.push({
      label: "Home Types",
      value: data?.homeTypes?.join(", "),
      position: "left",
    });
  }
  if (data?.hospital && data?.hospital?.name) {
    columns.push({
      label: "Closest Hospital",
      value: `${data.hospital.name} (${data.hospital.distance} miles)`,
      position: "right",
    });
  }
  if (data?.builders?.length > 0) {
    columns.push({
      label: "Builder",
      value: `${data.builders?.map((builder) => builder.name).join(", ")}`,
      position: "left",
    });
  }

  if (data?.airport && data?.airport?.name) {
    columns.push({
      label: "Closest International Airport",
      value: `${data.airport.name} (${data.airport.distance} miles)`,
      position: "right",
    });
  }

  if (data?.builtStart && data?.builtEnd) {
    columns.push({
      label: "New Construction",
      value: "No",
      position: "left",
    });
  }
  if (data?.builtStart && !data?.builtEnd) {
    columns.push({
      label: "New Construction",
      value: "Yes",
      position: "left",
    });
  }
  if (data?.builtEnd && !data?.builtStart) {
    columns.push({
      label: "New Construction",
      value: "No",
      position: "left",
    });
  }
  if (data?.militaryBase && data?.militaryBase?.name) {
    columns.push({
      label: "Closest Military Base",
      value: `${data.militaryBase.name} (${data.militaryBase.distance} miles)`,
      position: "right",
    });
  }
  return (
    <div className="mb35">
      <div className="row">
        <div className="col-12 col-md-6">
          {columns
            ?.filter((item) => item.position === "left")
            ?.map((detail, index) => (
              <div key={index} className="pd-list">
                <p className=" mb0 py4 dark-color">
                  <span className="fw500 ff-heading d-inline-block mr5">
                    {detail.label}:
                  </span>
                  {detail.label == "Price Range" ? (
                    <CommunityMinMaxPrice data={data} />
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </p>
              </div>
            ))}
        </div>
        <div className="col-12 col-md-6">
          {columns
            ?.filter((item) => item.position === "right")
            ?.map((detail, index) => (
              <div key={index} className="pd-list">
                <p className=" mb0 py4 dark-color">
                  <span className="fw500 ff-heading d-inline-block mr5">
                    {detail.label}:
                  </span>
                  {detail.label == "Price Range" ? (
                    <CommunityMinMaxPrice data={data} />
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
