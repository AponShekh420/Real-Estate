"use client";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
const Contact = () => {
  const { name, telephone, email, notes, errors } = useSelector(
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
              placeholder="Name of person contacted"
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
              placeholder="Contacted phone number"
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                let formattedValue = "";

                if (value.length > 0)
                  formattedValue += `(${value.substring(0, 3)}`;
                if (value.length > 3)
                  formattedValue += `) ${value.substring(3, 6)}`;
                if (value.length > 6)
                  formattedValue += ` ${value.substring(6, 10)}`;
                e.target.value = formattedValue;
                dispatch(
                  addCommunityFieldValue({
                    telephone: e.target.value,
                  })
                );
              }}
              value={telephone}
            />{" "}
            <p className="text-danger">{errors?.telephone?.msg}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Contacted email address"
              onChange={(e) => {
                dispatch(
                  addCommunityFieldValue({
                    email: e.target.value,
                  })
                );
              }}
              value={email}
            />
          </div>{" "}
          <p className="text-danger">{errors?.email?.msg}</p>
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
