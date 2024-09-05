"use client";
import LoginSignupModal from "@/components/common/login-signup-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inqueryType = [
  { value: 1, label: "One Star" },
  { value: 2, label: "Two Star" },
  { value: 3, label: "Three Star" },
  { value: 4, label: "Four Star" },
  { value: 5, label: "Five Star" },
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


const ReviewBoxForm = ({data}) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // redux
  const {userInfo} = useSelector(state => state.user)


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    setErrors({})
    console.log("community:P", data)
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/review/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          review,
          rating,
          communityId: data?._id
        })
      })
      const reviewData = await res.json();
      setLoading(false)
      if(reviewData.msg) {
        setReview("");
        setRating(5);
        toast.success(reviewData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        setErrors(reviewData?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  };

  return (
    <>
    <form className="comments_form mt15" 
    onSubmit={handleSubmit}
    action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/review/add`} 
    method={"post"} 
    encType="multipart/form-data"
    >
      <div className="row">
        <div className="col-md-12">
          <div className="widget-wrapper sideborder-dropdown mb-4">
            <label className="fw600 ff-heading mb-2">Rating</label>
            <div className="form-style2 input-group">
              <Select
                defaultValue={[inqueryType[4]]}
                name="colors"
                options={inqueryType}
                styles={customStyles}
                className="custom-react_select"
                classNamePrefix="select"
                onChange={(e)=> setRating(e.value)}
                isClearable={false}
                value={{value: rating, label: inqueryType[rating -1].label}}
              />
              <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.rating?.msg}</p>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Review</label>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              className="pt15"
              rows={6}
              placeholder="Write a Review"
              defaultValue={""}
              value={review}
            />
            <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.review?.msg}</p>
          </div>
          <button type={userInfo ? "submit": "button"} 
            className={`ud-btn btn-white2 d-flex align-items-center justify-content-center ${(loading || !userInfo) ? "opacity-50": "opacity-100"}`}
            data-bs-toggle={`${userInfo ? null : "modal"}`}
            data-bs-target="#loginSignupModal"
            role={userInfo ? null : "button"}
            disabled={loading}
          >
            {!loading && "Submit Review"}
            {loading ? (<BeatLoader color="white" size={22} loading={loading} />) : (<i className="fal fa-arrow-right-long" />)}
          </button>
          <ToastContainer/>
        </div>
        {/* End .col-6 */}
        
      </div>
    </form>
    {/* Signup Modal */}
    <div className="signup-modal">
      <div
        className="modal fade"
        id="loginSignupModal"
        tabIndex={-1}
        aria-labelledby="loginSignupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
          <LoginSignupModal />
        </div>
      </div>
    </div>
    {/* End Signup Modal */}
    </>
  );
};

export default ReviewBoxForm;
