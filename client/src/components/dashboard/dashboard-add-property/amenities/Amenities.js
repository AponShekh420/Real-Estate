import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AmenitiesHanlder from "./AmenitiesHanlder";

const amenitiesData = {
  column1: [
    { label: "Attic", defaultChecked: false },
    { label: "Basketball court", defaultChecked: true },
    { label: "Air Conditioning", defaultChecked: true },
    { label: "Lawn", defaultChecked: true },
    { label: "Swimming Pool", defaultChecked: false },
    { label: "Barbeque", defaultChecked: false },
    { label: "Microwave", defaultChecked: false },
  ],
  column2: [
    { label: "TV Cable", defaultChecked: false },
    { label: "Dryer", defaultChecked: true },
    { label: "Outdoor Shower", defaultChecked: true },
    { label: "Washer", defaultChecked: true },
    { label: "Gym", defaultChecked: false },
    { label: "Ocean view", defaultChecked: false },
    { label: "Private space", defaultChecked: false },
  ],
  column3: [
    { label: "Lake view", defaultChecked: false },
    { label: "Wine cellar", defaultChecked: true },
    { label: "Front yard", defaultChecked: true },
    { label: "Refrigerator", defaultChecked: true },
    { label: "WiFi", defaultChecked: false },
    { label: "Laundry", defaultChecked: false },
    { label: "Sauna Sauna Sauna a 4", defaultChecked: false },
  ],
};

const Amenities = () => {
  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <div className="d-flex justify-content-between">
                <label key={amenityIndex} className="custom_checkbox">
                  {amenity.label}
                  <input
                  className="p-0 m-0"
                    type="checkbox"
                    defaultChecked={amenity.defaultChecked}
                  />
                  <span className="checkmark" />
                </label>
                <div className="d-flex align-items-center gap-2">
                  <FaPencilAlt 
                    size={12} 
                    color="green" 
                    cursor="pointer" 
                    data-tooltip-id={`edit-${columnKey}`}
                  />
                  <MdDeleteForever 
                    size={16} 
                    color="red" 
                    cursor="pointer"
                    data-tooltip-id={`delete-${columnKey}`}
                  />
                  <ReactTooltip
                    id={`delete-${columnKey}`}
                    place="top"
                    content="Delete"
                  />
                  <ReactTooltip
                    id={`edit-${columnKey}`}
                    place="top"
                    content="Edit"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <AmenitiesHanlder/>
    </div>
  );
};

export default Amenities;
