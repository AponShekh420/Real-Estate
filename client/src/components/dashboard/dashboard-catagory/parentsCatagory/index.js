import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCatagoryFields } from "@/redux/catagorySlice";


const Catagory = () => {
  const { errors, catagoryName } = useSelector((state)=> state.catagory)
  const dispatch = useDispatch();

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Catagory Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addCatagoryFields({catagoryName: e.target.value}))
              }}
              value={catagoryName}
              placeholder="Type a catagory name"
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Catagory;
