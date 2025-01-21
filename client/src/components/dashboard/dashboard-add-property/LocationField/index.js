import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import ClosestSection from "../closest";
import Map from "./Map";
import SelectMulitField from "./SelectMulitField";

const LocationField = () => {
  const { errors, address, zip, map } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  return (
    <div className="form-style1">
      <div className="row">
        <SelectMulitField />
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ address: e.target.value }));
              }}
              value={address}
            />
            <p className="text-danger">{errors?.address?.msg}</p>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ zip: e.target.value }));
              }}
              value={zip}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the city, state, or area to locate the map."
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ map: e.target.value }));
              }}
              value={map}
            />
            <p className="text-danger">{errors?.map?.msg}</p>
          </div>
        </div>
        {/* End col-12 */}
        <ClosestSection />
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
    </div>
  );
};

export default LocationField;
