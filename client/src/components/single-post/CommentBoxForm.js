"use client";
import LoginSignupModal from "@/components/common/login-signup-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
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
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // redux
  const {userInfo} = useSelector(state => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    setErrors({})
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/comment/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          blogId: data?._id
        })
      })
      const commentData = await res.json();
      setLoading(false)
      if(commentData.msg) {
        setText("");
        toast.success(commentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        setErrors(commentData?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  };

  return (
    <>
    <form className="comments_form mt15" 
    onSubmit={handleSubmit}
    action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/comment/add`} 
    method={"post"} 
    encType="multipart/form-data"
    >
      <div className="row">
        
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Comment</label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="pt15"
              rows={6}
              placeholder="Write a comment"
              defaultValue={""}
              value={text}
            />
            <p className="text-danger text-capitalize" style={{fontSize: 13, lineHeight: 1.4}}>{errors?.text?.msg}</p>
          </div>
          <button type={userInfo ? "submit": "button"} 
            className={`ud-btn btn-white2 d-flex align-items-center justify-content-center ${(loading || !userInfo) ? "opacity-50": "opacity-100"}`}
            data-bs-toggle={`${userInfo ? null : "modal"}`}
            data-bs-target="#loginSignupModal"
            role={userInfo ? null : "button"}
            disabled={loading}
          >
            {!loading && "Submit Comment"}
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
