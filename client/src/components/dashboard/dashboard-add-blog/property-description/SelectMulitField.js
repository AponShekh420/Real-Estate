import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { addBlogFieldValue } from "@/redux/blogSlice";

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "#eb6753"
      : isHovered || isFocused
      ? "#eb675312"
      : undefined,
  }),
};

const SelectMultiField = () => {
  const { errors, catagoryId, subcatagoryId } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [catagoryOptions, setCatagoryOptions] = useState([]);
  const [subcatagoryOptions, setSubcatagoryOptions] = useState([]);

  const subcatagoryHandler = (currentCategories) => {
    // Extract selected subcategories from the current categories
    const newSubcatagoryIds = new Set();

    // Collect new subcategories from the selected categories
    currentCategories.forEach((eachCategory) => {
      const { subcatagory } = eachCategory?.value || {};
      if (Array.isArray(subcatagory)) {
        subcatagory.forEach(subcat => newSubcatagoryIds.add(subcat._id));
      }
    });

    // Filter the currently selected subcategories to only those that are still valid
    const remainingSubcatagoryId = subcatagoryId.filter(subcat =>
      newSubcatagoryIds.has(subcat._id)
    );

    // Update the state to keep only those subcategories that are still valid
    dispatch(
      addBlogFieldValue({
        subcatagoryId: remainingSubcatagoryId,
      })
    );
  };



  // after loading this component
  const subcatagoryOptionsAfterRendering = () => {
    let subcatagoryOptionValues = [];
    
    catagoryId.forEach((eachCatagory) => {
      const { subcatagory } = eachCatagory;
      subcatagoryOptionValues.push(...subcatagory);
    });
    
    setSubcatagoryOptions(subcatagoryOptionValues.length ? subcatagoryOptionValues : []);
  };

  const fetchCatagoryData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/getall`, {
        credentials: "include",
      });
      const catagoryData = await res.json();
      catagoryData.data.pop();
      setCatagoryOptions(catagoryData.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCatagoryData();
  }, []);


  useEffect(() => {
    if (catagoryId.length) {
      subcatagoryOptionsAfterRendering();
    }
  }, [catagoryId]);

  // Filter out selected categories from the options
  const filteredCatagoryOptions = catagoryOptions.filter(
    (option) => !catagoryId.some((selected) => selected._id === option._id)
  );


  const filteredSubcatagoryOptions = subcatagoryOptions.filter(
    (option) => !subcatagoryId.some((selected) => selected._id === option._id)
  );

  return (
    <>
      {/* Category Selection */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Parent Catagory</label>
          <div className="location-area">
            <Select
              instanceId="categorySelect"
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              isMulti
              options={filteredCatagoryOptions.map((item) => ({
                value: item,
                label: item.name,
              }))}
              onChange={(e) => {
                subcatagoryHandler(e);
                dispatch(
                  addBlogFieldValue({
                    catagoryId: e.map((eachElement) => eachElement.value),
                  })
                );
              }}
              value={catagoryId.map((eachElement) => ({
                value: eachElement,
                label: eachElement.name,
              }))}
            />
            <p className="text-danger">{errors?.catagoryId?.msg}</p>
          </div>
        </div>
      </div>

      {/* Subcategory Selection */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Subcategory</label>
          <div className="location-area">
            <Select
              instanceId="subcategorySelect"
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              isMulti
              options={filteredSubcatagoryOptions.map((item) => ({
                value: item,
                label: item.name,
              }))}
              onChange={(e) => {
                dispatch(
                  addBlogFieldValue({
                    subcatagoryId: e.map((eachElement) => eachElement.value),
                  })
                );
              }}
              value={subcatagoryId.map((eachElement) => ({
                value: eachElement,
                label: eachElement.name,
              }))}
            />
            <p className="text-danger">{errors?.subcatagoryId?.msg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
