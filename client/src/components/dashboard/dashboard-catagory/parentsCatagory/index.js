import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStateFields } from "@/redux/stateSlice";


const Catagory = () => {
  const { errors, stateName } = useSelector((state)=> state.state)
  const dispatch = useDispatch();

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12 col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Catagory Name</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addStateFields({stateName: e.target.value}))
              }}
              value={stateName}
            />
            <p className="text-danger">{errors?.name?.msg}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Catagory;
