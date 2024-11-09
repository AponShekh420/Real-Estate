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
  const { errors, catagoryId } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [catagoryOptions, setCatagoryOptions] = useState([]);


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



  // Filter out selected categories from the options
  const filteredCatagoryOptions = catagoryOptions.filter(
    (option) => !catagoryId.some((selected) => selected._id === option._id)
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
    </>
  );
};

export default SelectMultiField;
