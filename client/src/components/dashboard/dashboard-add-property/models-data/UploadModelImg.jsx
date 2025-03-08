"use client";
import { addModelFields } from "@/redux/modelSlice";
import { checkFileExtByUrl } from "@/utilis/checkFileExtByUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";

const UploadModelImg = () => {
  // redux
  const { img, deletedImages, newImages, errors, newDataNotify } = useSelector(
    (state) => state?.model
  );
  const dispatch = useDispatch();

  // Initial image from the server (could be a URL or image path)
  const [uploadedImg, setUploadedImg] = useState(img || ""); // For displaying the current image
  const [fileType, setFileType] = useState(""); // For displaying the current image

  // Handle image deletion
  const handleDeleteImg = (e) => {
    e.preventDefault();
    const deletedImg = img; // Save the current image to deletedImages

    dispatch(
      addModelFields({
        deletedImages: [...deletedImages, deletedImg],
        img: "", // Clear the current img in Redux state
      })
    );

    // Remove from local state
    setUploadedImg("");
  };

  // Handle new image addition or update
  const handleAddNewImg = (file) => {
    // deleting the existing one first
    const deletedImg = img; // Save the current image to deletedImages

    dispatch(
      addModelFields({
        deletedImages: [...deletedImages, deletedImg],
        img: "", // Clear the current img in Redux state
      })
    );

    const newFile = file[0];
    // Get the first file (single file)
    dispatch(
      addModelFields({
        newImages: [newFile], // Store new image in Redux
      })
    );

    // Display the uploaded image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImg(e.target.result); // Update local state to display the new image
    };
    reader.readAsDataURL(newFile);
    setFileType(newFile.type);
  };

  useEffect(() => {
    setUploadedImg(img);
  }, [newDataNotify]);

  return (
    <>
      <div className="profile-box position-relative d-md-flex align-items-end mb50">
        <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
          {uploadedImg &&
          (checkFileExtByUrl(uploadedImg) === "pdf" ||
            fileType === "application/pdf") ? (
            <iframe src={uploadedImg} width="800" height="600"></iframe>
          ) : (
            <Image
              width={240}
              height={220}
              className="w-100 cover h-100 "
              src={uploadedImg || "/images/listings/profile-1.jpg"}
              alt="profile avatar"
            />
          )}

          <button
            className="tag-del"
            style={{ border: "none" }}
            data-tooltip-id="profile_del"
            onClick={handleDeleteImg}
          >
            <span className="fas fa-trash-can" />
          </button>

          <ReactTooltip id="profile_del" place="right" content="Delete Image" />
        </div>
        {/* End .profile-img */}

        <div className="profile-content ml30 ml0-sm">
          <label className="upload-label pointer">
            <input
              name="img"
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => handleAddNewImg(e.target.files)}
              style={{ display: "none" }}
            />
            <div className="ud-btn btn-white2 mb30">
              Upload Model Image
              <i className="fal fa-arrow-right-long" />
            </div>
          </label>
          <p className={`text ${errors?.img?.msg ? "text-danger" : null}`}>
            {errors?.img?.msg || "Photos must be JPEG, JPG ,PNG or PDF format"}
          </p>
        </div>
      </div>
    </>
  );
};

export default UploadModelImg;
