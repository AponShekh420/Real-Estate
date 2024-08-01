"use client";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import SelectMultiField from "./SelectMulitField";
import { addBlogFieldValue } from "@/redux/blogSlice";
const PropertyDescription = () => {
  const {errors, title, desc, active} = useSelector((state)=> state.blog)
  const dispatch = useDispatch();

  const homeTypeOptions= [
    { value: "Single", label: "Single" },
    { value: "Family", label: "Family" },
    { value: "Condos", label: "Condos" },
    { value: "Manufactured", label: "Manufactured" },
    { value: "Attached", label: "Attached" },
  ];
  const listedIn = [
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
  ];
  const communityStatus = [
    { value: "Rent", label: "Rent" },
    { value: "Sold", label: "Sold" },
    { value: "Buy", label: "Buy" },
  ];

 

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };


  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your community title"
              onChange={(e)=> {
                dispatch(addBlogFieldValue({
                  title: e.target.value
                }))
              }}
              value={title}
            />
            <p className="text-danger">{errors?.title?.msg}</p>
          </div>
        </div>
        {/* End .col-12 */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Listed in
            </label>
            <div className="location-area">
              <Select
                instanceId="sdfjssdfiowre"
                id="sdfjssdfiowre"
                defaultValue={[listedIn[0]]}
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={(e)=> {
                  dispatch(addBlogFieldValue({
                    active: e.value === "Pending" ? false : true
                  }))
                }}
                value={{value: active ? "Approved" : "Pending", label: active ? "Approved" : "Pending"}}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}
        
        <SelectMultiField/>
        {/* End .col-6 */}



        {/* here would be react quill */}
        {/* End .col-6 */}


      </div>
    </form>
  );
};

export default PropertyDescription;
