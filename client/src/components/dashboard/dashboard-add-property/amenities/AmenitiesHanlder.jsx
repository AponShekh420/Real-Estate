"use client"
import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { BsEmojiSmile } from "react-icons/bs";
import { HashLoader } from 'react-spinners';
import { ImUpload } from 'react-icons/im';
import '@/components/dashboard/dashboard-location/style.css';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AmenitiesHanlder = () => {

  const [popular, setPopular] = useState(false);
  const [amenityName, setAmenityName] = useState("");
  const [Emoji, setEmoji] = useState("");
  const [prickerDisplay, setPrickerDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  

  const updateExistingAmenity = () => {

  }

  const uploadNewAmenity = () => {
    
  }

  const cancelAmenityUpdate = () => {
    setAmenityName("");
    setEmoji("");
    setPrickerDisplay(false);
    setEdit(false);
    setPopular(false);
    setLoading(false)
  }

  return (
    <div className="row">
      <hr />
      {/* header */}
      <h4 className='title fz17 mb30'>Manage Amenities</h4>
      <div className="d-flex align-items-center gap-2 mb25">
        <button className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${loading ? "opacity-50" : "opacity-100"}`} disabled={loading} onClick={edit ? updateExistingAmenity : uploadNewAmenity}>{edit ? "Update Amenity" : "Add New Amenity"}
          {!loading ? <ImUpload /> : <HashLoader
            color="#ffffff"
            loading={loading}
            cssOverride={override}
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          }
        </button>
        {edit ? (
          <button className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`} onClick={cancelAmenityUpdate}>
            Cancel
          </button>
          ): (
            ""
        )}
      </div>
      {/* header end */}

      {/* col 2 */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Write the amenity name"
            onChange={(e)=> setAmenityName(e.target.value)}
            value={amenityName}
          />
          {/* <p className="text-danger">{errors?.amenityName?.msg}</p> */}
        </div>
      </div>
      {/* col 2 end */}

      {/* col 2 */}
      <div className="col-sm-6 col-xl-4 d-flex align-items-end">
        <div className="mb20 d-flex align-items-center" style={{height: "55px", width: '55px'}}>
          <div className='d-flex align-items-center justify-content-center h-100 w-100 overflow-hidden position-relative pointer'>
            {!Emoji ? (
              <BsEmojiSmile size={55} onClick={() => setPrickerDisplay((old)=> !old)}/>
            ) : (
              <p style={{padding: 0, lineHeight: 0, margin: 0, fontSize: "50px", display: 'flex', alignItems: "center"}} onClick={() => setPrickerDisplay((old)=> !old)}>{Emoji}</p>
            )}
          </div>
          {prickerDisplay ? (
            <Picker data={data} onEmojiSelect={(e) => {
              setPrickerDisplay(false)
              setEmoji(e.native)
            }} className="position-absolute bottom-0 m-5"/>
          ): null}
        </div>
      </div>
      {/* col 2 end */}


      {/* col 1 */}
      <div className="col-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Popular
          </label>
          <div className="popular-options">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={()=>  setPopular(true)} checked={popular}/>
              <label class="form-check-label" for="inlineRadio1">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={()=> setPopular(false)} checked={popular ? false : true}/>
              <label class="form-check-label" for="inlineRadio2">No</label>
            </div>
          </div>
        </div>
      </div>
      {/* col 1 end */}
    </div>
  );
}

export default AmenitiesHanlder;