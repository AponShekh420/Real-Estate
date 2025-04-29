import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import ClosestSection from "../closest";
import Map from "./Map";
import SelectMulitField from "./SelectMulitField";

const LocationField = () => {
  const { errors, address, zip, map, county } = useSelector(
    (state) => state.community
  );
  const dispatch = useDispatch();

  return (
    <div className="form-style1">
      <div className="row">
        <SelectMulitField />
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address <span className="text-danger fs-6">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Street Address"
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ address: e.target.value }));
              }}
              value={address}
            />
            <p className="text-danger">{errors?.address?.msg}</p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City <span className="text-danger fs-6">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ map: e.target.value }));
              }}
              value={map}
            />
            <p className="text-danger">{errors?.map?.msg}</p>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip <span className="text-danger fs-6">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Zip Code"
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                e.target.value = value;
                dispatch(addCommunityFieldValue({ zip: e.target.value }));
              }}
              value={zip}
            />
            <p className="text-danger">{errors?.zip?.msg}</p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              County
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="County"
              onChange={(e) => {
                dispatch(addCommunityFieldValue({ county: e.target.value }));
              }}
              value={county}
            />
            <p className="text-danger">{errors?.county?.msg}</p>
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
