import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function EmbedYoutube() {
  const { embedVideo } = useSelector((state) => state.community);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <h4 className="title fz17 mb30">Upload Youtube Embed Video</h4>
      </div>
      <div className="col-sm-6">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Youtube Embed Link
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Paste Your Youtube Embed"
            onChange={(e) => {
              dispatch(
                addCommunityFieldValue({
                  embedVideo: e.target.value,
                })
              );
            }}
            value={embedVideo}
          />{" "}
        </div>
      </div>
    </div>
  );
}
