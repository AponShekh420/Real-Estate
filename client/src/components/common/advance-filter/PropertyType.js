const options = [
  { value: "Single-Family", label: "Single-Family" },
  { value: "Condos", label: "Condos" },
  { value: "Manufactured", label: "Manufactured" },
  { value: "Attached", label: "Attached" },
];
export default function PropertyType({
  currentHomeTypes,
  setCurrentHomeTypes,
}) {
  //property filter
  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setCurrentHomeTypes([]);
    } else {
      setCurrentHomeTypes(
        currentHomeTypes.includes(elm)
          ? [...currentHomeTypes.filter((el) => el != elm)]
          : [...currentHomeTypes, elm]
      );
    }
  };

  return (
    <div className="row">
      <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
        <h6 className="list-title">Property Type</h6>
        <div className="checkbox-style1">
          <label className="custom_checkbox">
            All
            <input
              type="checkbox"
              checked={currentHomeTypes.length < 1}
              onChange={(e) => setCurrentHomeTypes([])}
            />
            <span className="checkmark" />
          </label>
          {options.map((option, index) => (
            <label className="custom_checkbox" key={index}>
              {option.label}
              <input
                type="checkbox"
                checked={currentHomeTypes.includes(option.label)}
                onChange={(e) => {
                  handlepropertyTypes(option.label);
                }}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
