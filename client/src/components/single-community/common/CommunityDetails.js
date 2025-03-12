import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";

const CommunityDetails = ({ data }) => {
  const columns = [[]];
  if (data.minPrice || data.maxPrice) {
    columns[0].push({
      label: "Price Range",
      value: `$${data.minPrice} - $${data.maxPrice}`,
    });
  }
  if (data?.gated !== null) {
    columns[0].push({
      label: "Gated",
      value: data.gated ? "Yes" : "No",
    });
  }
  if (data.communitySize > 0) {
    columns[0].push({
      label: "Size",
      value: `${data.communitySize} Homes`,
    });
  }
  if (data?.ageRestrictions !== null) {
    columns[0].push({
      label: "Age Restrictions",
      value: data.ageRestrictions ? "55+" : "No",
    });
  }
  if (data?.builtStart && data?.builtEnd) {
    columns[0].push({
      label: "Construction Dates",
      value: `${data.builtStart.split("-")[0]} - ${
        data.builtEnd.split("-")[0]
      }`,
    });
  }
  if (data?.builtStart && !data?.builtEnd) {
    columns[0].push({
      label: "Construction Dates",
      value: `${data.builtStart.split("-")[0]} - Current`,
    });
  }
  if (data?.builtEnd && !data?.builtStart) {
    columns[0].push({
      label: "Construction Dates",
      value: `Completed ${data.builtEnd.split("-")[0]}`,
    });
  }

  if (data?.county) {
    columns[0].push({
      label: "County",
      value: data.county,
    });
  }

  if (data?.homeTypes?.length > 0) {
    columns[0].push({
      label: "Home Types",
      value: data?.homeTypes?.join(", "),
    });
  }
  if (data?.hospital && data?.hospital?.name) {
    columns[0].push({
      label: "Closest Hospital",
      value: `${data.hospital.name} (${data.hospital.distance} miles)`,
    });
  }
  if (data?.builders?.length > 0) {
    columns[0].push({
      label: "Builder",
      value: `${data.builders?.map((builder) => builder.name).join(", ")}`,
    });
  }

  if (data?.airport && data?.airport?.name) {
    columns[0].push({
      label: "Closest International Airport",
      value: `${data.airport.name} (${data.airport.distance} miles)`,
    });
  }

  if (data?.builtStart && data?.builtEnd) {
    columns[0].push({
      label: "New Construction",
      value: "No",
    });
  }
  if (data?.builtStart && !data?.builtEnd) {
    columns[0].push({
      label: "New Construction",
      value: "Yes",
    });
  }
  if (data?.builtEnd && !data?.builtStart) {
    columns[0].push({
      label: "New Construction",
      value: "No",
    });
  }
  if (data?.militaryBase && data?.militaryBase?.name) {
    columns[0].push({
      label: "Closest Military Base",
      value: `${data.militaryBase.name} (${data.militaryBase.distance} miles)`,
    });
  }
  return (
    <div className="mb35">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={`row `}>
          {column.map((detail, index) => (
            <div key={index} className={`col-12 col-md-6`}>
              <div className="pd-list">
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommunityDetails;
