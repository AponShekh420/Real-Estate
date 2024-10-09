import React from "react";
import classes from "./amenitiesStyle.module.css";

const Amenities = ({ data }) => {
  const { amenities } = data;

  // Sort amenities alphabetically by name
  const sortedData = amenities.sort((a, b) => a.name.localeCompare(b.name));

  // Calculate the size of each column
  const columnSize = Math.ceil(sortedData.length / 3);

  // Create three columns by slicing the sorted array
  const featuresAmenitiesData = [
    sortedData.slice(0, columnSize), // First column: from 0 to columnSize
    sortedData.slice(columnSize, columnSize * 2), // Second column: from columnSize to columnSize*2
    sortedData.slice(columnSize * 2), // Third column: from columnSize*2 to the end
  ];

  return (
    <>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className={`col-sm-6 col-md-4 ${classes.amenities}`}>
          <ul className="pd-list">
            {row.map((item, index) => (
              <li key={index} className="text mb10">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Amenities;
