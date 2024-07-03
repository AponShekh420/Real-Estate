import React from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue } from "@/redux/communitySlice";

const LocationField = () => {
  const {address, zip, lat, long} = useSelector((state)=> state.community)
  const dispatch = useDispatch();


  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({address: e.target.value}))
              }}
            />
          </div>
        </div>
        {/* End col-12 */}

        <SelectMulitField />

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip</label>
            <input type="text" className="form-control" 
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({zip: e.target.value}))
              }}
            />
          </div>
        </div>
        {/* End col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Neighborhood
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Neighborhood"
            />
          </div>
        </div> */}
        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Place the listing pin on the map
            </label>
            <Map />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Latitude
            </label>
            <input type="number" className="form-control"
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({lat: e.target.value}))
              }}
            />
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Longitude
            </label>
            <input type="number" className="form-control" 
              onChange={(e)=> {
                dispatch(addCommunityFieldValue({long: e.target.value}))
              }}
            />
          </div>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default LocationField;
