"use client"
import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { BsEmojiSmile } from "react-icons/bs";
import { HashLoader } from 'react-spinners';
import { ImUpload } from 'react-icons/im';
import '@/components/dashboard/dashboard-location/style.css';
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AmenitiesHanlder = ({setPopular, setAmenityName, setEmoji, setEdit, popular, amenityName, emoji, edit, setNotify}) => {

  const [prickerDisplay, setPrickerDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  

  const updateExistingAmenity = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenity/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: edit,
          name: amenityName,
          popular: popular,
          icon: emoji,
        })
      });
      const currentAmenity = await res.json();
      setLoading(false);
      if(currentAmenity?.msg) {
        toast.success(currentAmenity?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setEdit(false);
        setEmoji("");
        setPopular(false);
        setPrickerDisplay(false);
        setAmenityName("");
        setNotify(Math.random());
      } else {
        setErrors(currentAmenity?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  const uploadNewAmenity = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenity/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: amenityName,
          popular: popular,
          icon: emoji,
        })
      });
      const currentAmenity = await res.json();
      setLoading(false);
      if(currentAmenity?.msg) {
        toast.success(currentAmenity?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setEmoji("");
        setPopular(false);
        setPrickerDisplay(false);
        setAmenityName("");
        setNotify(Math.random())
      } else {
        setErrors(currentAmenity?.errors)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  const cancelAmenityUpdate = () => {
    setAmenityName("");
    setEmoji("");
    setPrickerDisplay(false);
    setEdit(false);
    setPopular(false);
    setLoading(false);
    setErrors({});
  }

  return (
    <div className="row p-4 rounded-2 mr0 ml0 mt25" style={{border: "2px solid #d1d1d1"}}>
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
          <p className="text-danger">{errors?.name?.msg}</p>
        </div>
      </div>
      {/* col 2 end */}

      {/* col 2 */}
      <div className="col-sm-6 col-xl-4 d-flex mt0-xs mt35" style={{height: "54px"}}>
        <div className="mb20 d-flex align-items-center" style={{height: "54px", width: '54px'}}>
          <div className='d-flex align-items-center justify-content-center h-100 w-100 overflow-hidden position-relative pointer'>
            {!emoji ? (
              <BsEmojiSmile size={55} onClick={() => setPrickerDisplay((old)=> !old)}/>
            ) : (
              <p style={{padding: 0, lineHeight: 0, margin: 0, fontSize: "50px", display: 'flex', alignItems: "center"}} onClick={() => setPrickerDisplay((old)=> !old)}>{emoji}</p>
            )}
          </div>
          {prickerDisplay ? (
            <div className="position-absolute bottom-0">
              <Picker data={data} onEmojiSelect={(e) => {
                setPrickerDisplay(false)
                setEmoji(e.native)
              }} />
            </div>
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
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e)=>  e.target.checked ? setPopular(true) : setPopular(false)} checked={popular}/>
              <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e)=> e.target.checked ? setPopular(false) : setPopular(true) } checked={popular ? false : true}/>
              <label className="form-check-label" htmlFor="inlineRadio2">No</label>
            </div>
          </div>
        </div>
      </div>
      {/* col 1 end */}
    </div>
  );
}

export default AmenitiesHanlder;