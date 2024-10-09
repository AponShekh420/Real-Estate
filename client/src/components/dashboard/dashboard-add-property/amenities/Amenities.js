"use client";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AmenitiesHanlder from "./AmenitiesHanlder";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteAmenity from "./DeleteAmenity";

const Amenities = () => {
  const [unpopularAmenities, setUnpopularAmenities] = useState({});
  const [popularAmenities, setPopularAmenities] = useState({});
  const [popular, setPopular] = useState(false);
  const [amenityName, setAmenityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState("");

  const [allChecked, setAllChecked] = useState(false);
  const [allPopularChecked, setAllPopularChecked] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { amenities } = useSelector((state) => state.community);

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
    const chunks = chunkArray(array, 7);
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

  const editHanlder = (amenity) => {
    const { name, icon, _id, popular } = amenity;
    setPopular(popular);
    setAmenityName(name);
    setEdit(_id);
    setEmoji(icon);
  };

  // Handle individual checkbox selection
  const checkHanlder = (e, amenity) => {
    if (e.target.checked) {
      dispatch(
        addCommunityFieldValue({
          amenities: [...amenities, amenity],
        })
      );
    } else {
      const newCheckedArray = amenities.filter(
        (element) => element?._id !== amenity?._id
      );
      dispatch(
        addCommunityFieldValue({
          amenities: newCheckedArray,
        })
      );
    }
  };

  // Handle "All" checkbox
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);

    const allAmenities = Object.values(unpopularAmenities).flat();
    if (checked) {
      // Add all unpopular amenities to Redux state
      dispatch(
        addCommunityFieldValue({
          amenities: [...amenities, ...allAmenities.filter((amenity) => !amenities.some((a) => a._id === amenity._id))],
        })
      );
    } else {
      // Remove all unpopular amenities from Redux state
      dispatch(
        addCommunityFieldValue({
          amenities: amenities.filter(
            (amenity) => !allAmenities.some((a) => a._id === amenity._id)
          ),
        })
      );
    }
  };

  // Handle "All Popular" checkbox
  const handleAllPopularCheck = (e) => {
    const checked = e.target.checked;
    setAllPopularChecked(checked);

    const allPopularAmenities = Object.values(popularAmenities).flat();
    if (checked) {
      // Add all popular amenities to Redux state
      dispatch(
        addCommunityFieldValue({
          amenities: [...amenities, ...allPopularAmenities.filter((amenity) => !amenities.some((a) => a._id === amenity._id))],
        })
      );
    } else {
      // Remove all popular amenities from Redux state
      dispatch(
        addCommunityFieldValue({
          amenities: amenities.filter(
            (amenity) => !allPopularAmenities.some((a) => a._id === amenity._id)
          ),
        })
      );
    }
  };

  useEffect(() => {
    if (notify?.msg === "Delete") {
      checkHanlder({ target: { checked: false } }, notify?.amenity);
    }
    fetchAmenities();
  }, [notify]);

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
      {/* Unpopular Amenities Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label>
          <input type="checkbox" checked={allChecked} onChange={handleAllCheck} /> All Unpopular
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "start" }} className="gap-sm-3 gap-lg-3 gap-0 d-sm-flex d-block">
        {Object.keys(unpopularAmenities).map((columnKey, index) => (
          <div key={index} className="col-sm-5 col-lg-3 col-xxl-2 col-12">
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
                  <div className="d-flex align-items-center gap-2">
                    <a style={{ border: "none", color: "red", padding: "0px", fontSize: "20px", cursor: "pointer" }} data-tooltip-id={`edit-${columnKey}`}>
                      <FaPencilAlt onClick={() => editHanlder(amenity)} size={12} color="green" cursor="pointer" />
                    </a>
                    <DeleteAmenity amenity={amenity} columnKey={columnKey} setNotify={setNotify} />
                    <ReactTooltip id={`delete-${columnKey}`} place="top" content="Delete" />
                    <ReactTooltip id={`edit-${columnKey}`} place="top" content="Edit" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ margin: "20px 0", borderTop: "1px solid black", position: "relative" }}>
        <label>
          <input type="checkbox" checked={allPopularChecked} onChange={handleAllPopularCheck} /> All Popular
        </label>
      </div>

      {/* Popular Amenities Section */}
      <div style={{ display: "flex", justifyContent: "start" }} className="gap-sm-3 gap-lg-3 gap-0 d-sm-flex d-block">
        {Object.keys(popularAmenities).map((columnKey, index) => (
          <div key={index} className="col-sm-5 col-lg-3 col-xxl-2 col-12">
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
                  <div className="d-flex align-items-center gap-2">
                    <a style={{ border: "none", color: "red", padding: "0px", fontSize: "20px", cursor: "pointer" }} data-tooltip-id={`edit-${columnKey}`}>
                      <FaPencilAlt onClick={() => editHanlder(amenity)} size={12} color="green" cursor="pointer" />
                    </a>
                    <DeleteAmenity amenity={amenity} columnKey={columnKey} setNotify={setNotify} />
                    <ReactTooltip id={`delete-${columnKey}`} place="top" content="Delete" />
                    <ReactTooltip id={`edit-${columnKey}`} place="top" content="Edit" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AmenitiesHanlder
        setPopular={setPopular}
        setAmenityName={setAmenityName}
        setEmoji={setEmoji}
        setEdit={setEdit}
        popular={popular}
        amenityName={amenityName}
        emoji={emoji}
        edit={edit}
        setNotify={setNotify}
      />
      <ToastContainer />
    </div>
  );
};

export default Amenities;
