import SelectMulitField from "./SelectMulitField";

// quill text editor imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCityFields } from "@/redux/citySlice";

const SubCatagory = () => {
  const {errors, cityName, abbreviation} = useSelector((state)=> state.city);
  const dispatch = useDispatch();

  return (
    <form className="form-style1">
      <div className="row">
        
        <SelectMulitField />

        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Subcatagory Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> dispatch(addCityFields({
                cityName: e.target.value
              }))}
              value={cityName}
              placeholder="Type a subcatagory name"
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default SubCatagory;
