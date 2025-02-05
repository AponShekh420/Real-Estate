import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";

const CommunityDetails = ({ data }) => {
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
        label: "Construction Dates",
        value:
          data.builtEnd != "Present"
            ? `${data.builtStart.split("-")[0]} - ${
                data.builtEnd.split("-")[0]
              }`
            : "New Construction",
      },
    ],
  ];
  if (data?.ageRestrictions !== null) {
    columns[0].push({
      label: "Age Restrictions",
      value: data.ageRestrictions ? "55+" : "N/A",
    });
  }
  if (data?.gated !== null) {
    columns[0].push({
      label: "Gated",
      value: data.gated ? "Yes" : "No",
    });
  }
  if (data?.homeTypes?.length > 0) {
    columns[0].push({
      label: "Home Types",
      value: data?.homeTypes?.join(", "),
    });
  }
  if (data?.builders?.length > 0) {
    columns[0].push({
      label: "builder",
      value: `${data.builders
        ?.slice(0, 2)
        .map((builder) => builder.name)
        .join(", ")}`,
    });
  }
  const datas = {
    airport: { name: "ss", distance: 113 },
    hospital: { name: "ss", distance: 110 },
    militaryBase: { name: "db", distance: 1022 },
  };

  if (data?.hospital && data?.hospital?.name) {
    columns[0].push({
      label: "Closest Hospital",
      value: `${data.hospital.name} (${data.hospital.distance} miles)`,
    });
  }
  if (data?.airport && data?.airport?.name) {
    columns[0].push({
      label: "Closest International Airport",
      value: `${data.airport.name} (${data.airport.distance} miles)`,
    });
  }
  if (data?.militaryBase && data?.militaryBase?.name) {
    columns[0].push({
      label: "Closest Military Base",
      value: `${data.militaryBase.name} (${data.militaryBase.distance} miles)`,
    });
  }
  return (
    <div className="row mb35">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={`col-12`}>
          {column.map((detail, index) =>
            detail.label == "Price Range" ? (
              <div key={index} className="d-flex justify-content-between bdrb1">
                <div className="pd-list">
                  <p className="fw600 mb0 py5 ff-heading dark-color">
                    {detail.label}:
                  </p>
                </div>
                <div className="pd-list">
                  <p className="text mb0 py5 text-end">
                    <CommunityMinMaxPrice data={data} />
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
          )}
        </div>
      ))}
    </div>
  );
};

export default CommunityDetails;
