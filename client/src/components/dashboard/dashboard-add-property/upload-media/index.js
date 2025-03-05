import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import EmbedYoutube from "./EmbedYoutube";
import UploadPhotoGallery from "./UploadPhotoGallery";

const UploadMedia = () => {
  const { errors, pictureDone } = useSelector((state) => state.community);
  const dispatch = useDispatch();
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <h4 className="title fz17 mb20">Upload photos of your community</h4>
        <p className="text-danger fs-4 mt-0">{errors?.imgs?.msg}</p>
      </div>
      <div className="mb30">
        <label
          style={{ width: "fit-content" }}
          className="h6 d-flex  align-items-start gap-1"
        >
          <input
            type="checkbox"
            style={{ height: 20, width: 20 }}
            checked={pictureDone}
            onChange={(e) => {
              console.log(e.target.checked);
              dispatch(
                addCommunityFieldValue({
                  pictureDone: e.target.checked,
                })
              );
            }}
          />{" "}
          <span>Picture Done</span>
        </label>
      </div>
      <div className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery />
          </div>
        </div>
      </div>
      <div className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <EmbedYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMedia;
