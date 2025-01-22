"use client";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
const Contact = () => {
  const { name, telephone, email, notes } = useSelector(
    (state) => state.community
  );
  const dispatch = useDispatch();

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
    <div className="form-style1">
      <div className="row">
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your name"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    name: e.target.value,
                  })
                );
              }}
              value={name}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your phone number"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    telephone: e.target.value,
                  })
                );
              }}
              value={telephone}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type your email"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    email: e.target.value,
                  })
                );
              }}
              value={email}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-sm-6 col-xl-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Notes</label>
            <textarea
              onChange={(e) =>
                dispatch(
                  addCommunityFieldValue({
                    notes: e.target.value,
                  })
                )
              }
              type="text"
              className={`form-control`}
              placeholder="Write Notes..."
              value={notes}
              style={{ height: "300px" }}
            ></textarea>
          </div>
        </div>
        {/* End .row */}
      </div>
    </div>
  );
};

export default Contact;
