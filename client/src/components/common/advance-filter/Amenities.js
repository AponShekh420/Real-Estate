"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Amenities = ({amenities, setAmenities}) => {
  const [unpopularAmenities, setUnpopularAmenities] = useState({});
  const [popularAmenities, setPopularAmenities] = useState({});
  const [notify, setNotify] = useState("");
  const [toggleAmenities, setToggleAmenities] = useState(false);



  const [allChecked, setAllChecked] = useState(false);
  const [allPopularChecked, setAllPopularChecked] = useState(false);


  // Utility to split array into chunks
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Transform data into columns
  const transformData = (array) => {
    const chunks = chunkArray(array, 5);
    const result = {};
    chunks.forEach((chunk, index) => {
      result[`column${index + 1}`] = chunk;
    });
    return result;
  };

  const fetchAmenities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenity/getall`, {credentials: "include"});
      const { data } = await res.json();
      
      // Sort amenities alphabetically by name
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));


      const unpopular = sortedData.filter(amenity => !amenity.popular);
      const popular = sortedData.filter(amenity => amenity.popular);

      setUnpopularAmenities(transformData(unpopular));
      setPopularAmenities(transformData(popular));
    } catch (err) {
      console.log(err.message);
    }
  };

  // Handle individual checkbox selection
  const checkHanlder = (e, amenity) => {
    if (e.target.checked) {
      setAmenities([...amenities, amenity])
    } else {
      const newCheckedArray = amenities.filter(
        (element) => element?._id !== amenity?._id
      );
      setAmenities(newCheckedArray)
    }
  };

  // Handle "All" checkbox
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);

    const allAmenities = Object.values(unpopularAmenities).flat();
    if (checked) {
      // Add all unpopular amenities to Redux state
      setAmenities([...amenities, ...allAmenities.filter((amenity) => !amenities.some((a) => a._id === amenity._id))])
    } else {
      // Remove all unpopular amenities from Redux state
      setAmenities(amenities.filter(
        (amenity) => !allAmenities.some((a) => a._id === amenity._id)
      ))
    }
  };

  // Handle "All Popular" checkbox
  const handleAllPopularCheck = (e) => {
    const checked = e.target.checked;
    setAllPopularChecked(checked);

    const allPopularAmenities = Object.values(popularAmenities).flat();
    if (checked) {
      // Add all popular amenities to Redux state
      setAmenities([...amenities, ...allPopularAmenities.filter((amenity) => !amenities.some((a) => a._id === amenity._id))])
    } else {
      // Remove all popular amenities from Redux state
      setAmenities(amenities.filter(
        (amenity) => !allPopularAmenities.some((a) => a._id === amenity._id)
      ))
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    // Automatically check/uncheck "All" based on individual checkboxes
    const allAmenities = Object.values(unpopularAmenities).flat();
    const isAllChecked = allAmenities.every((amenity) =>
      amenities.some((a) => a._id === amenity._id)
    );
    setAllChecked(isAllChecked);

    // Automatically check/uncheck "All Popular" based on individual checkboxes
    const allPopularAmenities = Object.values(popularAmenities).flat();
    const isAllPopularChecked = allPopularAmenities.every((amenity) =>
      amenities.some((a) => a._id === amenity._id)
    );
    setAllPopularChecked(isAllPopularChecked);
  }, [amenities, unpopularAmenities, popularAmenities]);

  return (
    <div className="row">
      {/* Divider */}
      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label>
          <input type="checkbox" checked={allPopularChecked} onChange={handleAllPopularCheck} /> All Popular
        </label>
      </div>

      {/* Popular Amenities Section */}
      <div className="d-flex flex-wrap">
        {Object.keys(popularAmenities).map((columnKey, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-12">
            <div className="checkbox-style1">
              {popularAmenities[columnKey].map((amenity, amenityIndex) => (
                <div className="d-flex justify-content-between align-items-center mb10" key={amenityIndex}>
                  <label className="custom_checkbox d-flex align-items-center" style={{ lineHeight: "20px" }}>
                    {amenity?.name}
                    <input
                      className="p-0 m-0"
                      type="checkbox"
                      checked={amenities.some((a) => a._id === amenity._id)}
                      onChange={(e) => checkHanlder(e, amenity)}
                    />
                    <span className="checkmark" style={{ top: 3 }} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unpopular Amenities Section */}

      <div className="collapse" id="collapseExample">
        <div>
          <div style={{ margin: "12px 0", borderTop: "1px solid black", position: "relative" }}>
            <label>
              <input type="checkbox" checked={allChecked} onChange={handleAllCheck} /> All Unpopular
            </label>
          </div>
          <div className="d-flex flex-wrap">
            {Object.keys(unpopularAmenities).map((columnKey, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-12">
                <div className="checkbox-style1">
                  {unpopularAmenities[columnKey].map((amenity, amenityIndex) => (
                    <div className="d-flex justify-content-between align-items-center mb10" key={amenityIndex}>
                      <label className="custom_checkbox d-flex align-items-center" style={{ lineHeight: "20px" }}>
                        {amenity?.name}
                        <input
                          className="p-0 m-0"
                          type="checkbox"
                          checked={amenities.some((a) => a._id === amenity._id)}
                          onChange={(e) => checkHanlder(e, amenity)}
                        />
                        <span className="checkmark" style={{ top: 3 }} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="d-flex align-items-center justify-content-center mt15 mb15">
        <a className="d-flex gap-1 align-items-center fw-bold" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => setToggleAmenities((old)=> !old)}>
          {toggleAmenities ? "View Less" : "View All"}
          {toggleAmenities ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </a>
      </div>


    </div>
  );
};

export default Amenities;
