import SingleModel from "./SingleModel";
import UploadModelImg from "./UploadModelImg";
import classes from './communityModel.module.css'
const ModelMangement = () => {
  return (
    <div>
      <SingleModel/>


      <div className={`ps-widget ${classes.boxBg} bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative`}>
        <h4 className="title fz17 mb30">Add New Model</h4>
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Upload photos of your property</h4>
          <form className="form-style1">
            <div className="row">
              <div className="col-lg-12">
                <UploadModelImg />
              </div>
            </div>
            {/* End col-12 */}

            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type The Title Name"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className={`form-control ${classes.modelDes}` }
                    placeholder="Write Description For Model"
                  >
                  </textarea>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-sm-6 col-xl-12">
                <div className="mb30 d-flex justify-content-end">
                  <button className={`${classes.addModelBtn} border border-dark bg-white rounded-2`}>
                    Add Model
                  </button>
                </div>
              </div>
            </div>
            {/* End .row */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelMangement;