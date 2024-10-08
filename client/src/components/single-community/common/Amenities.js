import React from "react";
import classes from "./amenitiesStyle.module.css"
const Amenities = ({data}) => {
  const {amenities} = data;
  const column1 = (amenities.length / 3) * 2; // will start from 66 of 100;
  const column2 = (amenities.length / 3) //will start from 33 of 100

  const featuresAmenitiesData = [
    [...amenities.slice(column1, amenities.length)],
    [...amenities.slice(column2, column1)],
    [...amenities.slice(0, column2)],
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
