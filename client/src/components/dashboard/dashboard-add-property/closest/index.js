import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function ClosestSection() {
  const { errors, hospital, airport, militaryBase } = useSelector(
    (state) => state.community
  );

  const dispatch = useDispatch();

  return (
    <div className="col-sm-12 row mt20">
      <div className="col-sm-6 col-xl-4 ">
        <h4 className="title fz17 mb20">Closest Hospital</h4>
        <div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Hospital
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the hospital name"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    hospital: { ...hospital, name: e.target.value },
                  })
                );
              }}
              value={hospital?.name}
            />
          </div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Distance
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Hospital distance"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    hospital: { ...hospital, distance: Number(e.target.value) },
                  })
                );
              }}
              value={hospital?.distance}
            />
            <p className="text-danger">{errors?.hospital?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <h4 className="title fz17 mb20">Closest Airport</h4>
        <div className="">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Airport
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the hospital name"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    airport: { ...airport, name: e.target.value },
                  })
                );
              }}
              value={airport?.name}
            />
          </div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Distance
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Airport distance"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    airport: { ...airport, distance: Number(e.target.value) },
                  })
                );
              }}
              value={airport?.distance}
            />
            <p className="text-danger">{errors?.airport?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <h4 className="title fz17 mb20">Closest Military Base for VA</h4>
        <div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Military Base
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the hospital name"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    militaryBase: { ...militaryBase, name: e.target.value },
                  })
                );
              }}
              value={militaryBase?.name}
            />
          </div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Distance
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Military base distance"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    militaryBase: {
                      ...militaryBase,
                      distance: Number(e.target.value),
                    },
                  })
                );
              }}
              value={militaryBase?.distance}
            />
            <p className="text-danger">{errors?.militaryBase?.msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
