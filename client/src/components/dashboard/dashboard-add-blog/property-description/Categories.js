"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlogFieldValue } from "@/redux/blogSlice"; // Assuming you're using blogSlice

const Categories = () => {
  const [categories, setCategories] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [showMore, setShowMore] = useState(false); // State for toggling "View More/Less"

  // Redux
  const dispatch = useDispatch();
  const { catagoryId } = useSelector((state) => state.blog); // Fetching catagoryId from Redux

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
    const chunks = chunkArray(array, 5); // 7 categories per column
    const result = {};
    chunks.forEach((chunk, index) => {
      result[`column${index + 1}`] = chunk;
    });
    return result;
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/getall`, { credentials: "include" });
      let { data } = await res.json();

      // Remove "Uncatagory" from the list
      data = data.filter(category => category.name.toLowerCase() !== "uncatagory");

      // Sort categories alphabetically by name
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

      // Transform sorted data into columns
      setCategories(transformData(sortedData));
    } catch (err) {
      console.log(err.message);
    }
  };

  // Handle individual checkbox selection
  const checkHandler = (e, category) => {
    let updatedCatagoryId;

    if (e.target.checked) {
      // Add selected category and remove "Uncatagory" if any other category is selected
      updatedCatagoryId = [
        ...catagoryId.filter((cat) => cat.name.toLowerCase() !== "uncatagory"),
        category,
      ];
    } else {
      // Remove selected category
      updatedCatagoryId = catagoryId.filter(
        (element) => element?._id !== category?._id
      );
    }

    // Dispatch the updated categories
    dispatch(
      addBlogFieldValue({
        catagoryId: updatedCatagoryId,
      })
    );
  };

  // Handle "All" checkbox
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);

    const allCategories = Object.values(categories).flat();
    if (checked) {
      // Add all categories to Redux state
      dispatch(
        addBlogFieldValue({
          catagoryId: [...catagoryId, ...allCategories.filter((category) => !catagoryId.some((a) => a._id === category._id))],
        })
      );
    } else {
      // Remove all categories from Redux state
      dispatch(
        addBlogFieldValue({
          catagoryId: catagoryId.filter(
            (category) => !allCategories.some((a) => a._id === category._id)
          ),
        })
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Automatically check/uncheck "All" based on individual checkboxes
    const allCategories = Object.values(categories).flat();
    const isAllChecked = allCategories.every((category) =>
      catagoryId.some((a) => a._id === category._id)
    );
    setAllChecked(isAllChecked);
  }, [catagoryId, categories]);

  return (
    <div className="row">
      {/* All Categories Checkbox */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
        <label className="fw-bold">
          <input type="checkbox" checked={allChecked} onChange={handleAllCheck} /> Select All
        </label>
      </div>

      {/* Categories List */}
      <div style={{ display: "flex", justifyContent: "start" }} className="gap-sm-3 gap-lg-3 gap-0 d-sm-flex d-block">
        {Object.keys(categories).map((columnKey, index) => (
          <div key={index} className="col-sm-5 col-lg-3 col-xxl-2 col-12">
            <div className="checkbox-style1">
              {/* Show only the first 7 categories by default, or all if 'showMore' is true */}
              {categories[columnKey]
                .slice(0, showMore ? categories[columnKey].length : 5)
                .map((category, categoryIndex) => (
                  <div className="d-flex justify-content-between align-items-center mb10" key={categoryIndex}>
                    <label className="custom_checkbox d-flex align-items-center" style={{ lineHeight: "20px" }}>
                      {category?.icon}{category?.name}
                      <input
                        className="p-0 m-0"
                        type="checkbox"
                        checked={catagoryId.some((a) => a._id === category._id)}
                        onChange={(e) => checkHandler(e, category)}
                      />
                      <span className="checkmark" style={{ top: 3 }} />
                    </label>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => setShowMore(!showMore)}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            color: "#007bff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
};

export default Categories;
