
const PropertyAddress = ({data}) => {
 

  return (
    <>
      <div className={`col-md-6 col-xl-4`}>
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">State</p>
            <p className="fw600 mb10 ff-heading dark-color">City</p>
            <p className="fw600 mb-0 ff-heading dark-color">Area</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{data?.state?.name}</p>
            <p className="text mb10">{data?.city?.name}</p>
            <p className="text mb10">{data?.area?.name}</p>
          </div>
        </div>
      </div>

      <div className={`col-md-6 col-xl-4 offset-xl-2`}>
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Address</p>
            <p className="fw600 mb10 ff-heading dark-color">Zip Code</p>
            <p className="fw600 mb10 ff-heading dark-color">Country</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{data?.address}</p>
            <p className="text mb10">{data?.zip}</p>
            <p className="text mb10">USA</p>
          </div>
        </div>
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
