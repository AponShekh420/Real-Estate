"use client"
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";

const MetaData = () => {
  const {metaTitle, metaDesc, metaSlug} = useSelector(state =>  state.community);
  const dispatch = useDispatch();
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Meta Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type your meta title"
            onChange={(e)=> {
              dispatch(addCommunityFieldValue({
                metaTitle: e.target.value
              }))
            }}
            value={metaTitle}
          />
          <nav aria-label="breadcrumb" className="d-flex justify-content-end">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">{metaTitle?.length}</li>
              <li className="breadcrumb-item">50–60 characters is recommendation</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End .col-12 */}

      <div className="col-sm-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Slug</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type your meta title"
            onChange={(e)=> {
              dispatch(addCommunityFieldValue({
                metaSlug: e.target.value
              }))
            }}
            value={metaSlug}
          />
        </div>
      </div>
      {/* End .col-12 */}

      <div className="col-sm-6 col-xl-12">
        <div className="mb30">
          <label className="heading-color ff-heading fw600 mb10">
            Meta Description
          </label>
          <textarea
            onChange={(e)=> dispatch(addCommunityFieldValue({
              metaDesc: e.target.value
            }))}
            type="text"
            className={`form-control`}
            placeholder="Write meta description"
            value={metaDesc}
            style={{height: "170px"}}
          >
          </textarea>
          <nav aria-label="breadcrumb" className="d-flex justify-content-end">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">{metaDesc?.length}</li>
              <li className="breadcrumb-item">60–160 characters is recommendation</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End .row */}
    </div>
  );
}

export default MetaData;