"use client";
import "@/components/dashboard/dashboard-location/style.css";
import { useState } from "react";
import { ImUpload } from "react-icons/im";
import { HashLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BuildersHanlder = ({
  setBuilderName,
  setEmoji,
  setEdit,
  popular,
  builderName,
  emoji,
  edit,
  setNotify,
}) => {
  const [prickerDisplay, setPrickerDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateExistingBuilder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: edit,
            name: builderName,
            icon: emoji,
          }),
        }
      );
      const currentBuilder = await res.json();
      setLoading(false);
      if (currentBuilder?.msg) {
        setEdit(false);
        setEmoji("");
        setPrickerDisplay(false);
        setBuilderName("");
        setNotify(Math.random());
      } else {
        setErrors(currentBuilder?.errors);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const uploadNewBuilder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: builderName,
            icon: emoji,
          }),
        }
      );
      const currentBuilder = await res.json();
      setLoading(false);
      if (currentBuilder?.msg) {
        setEmoji("");
        setPrickerDisplay(false);
        setBuilderName("");
        setNotify(Math.random());
      } else {
        setErrors(currentBuilder?.errors);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const cancelBuilderUpdate = () => {
    setBuilderName("");
    setEmoji("");
    setPrickerDisplay(false);
    setEdit(false);
    setLoading(false);
    setErrors({});
  };

  return (
    <div
      className="row p-4 rounded-2 mr0 ml0 mt25"
      style={{ border: "2px solid #d1d1d1" }}
    >
      {/* header */}
      <h4 className="title fz17 mb30">Manage Builders</h4>
      <div className="d-flex align-items-center gap-2 mb25">
        <button
          className={`bdrs0 btn-primary rounded-2 py-1 px-2 d-flex gap-2 justify-content-center align-items-center ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          disabled={loading}
          onClick={edit ? updateExistingBuilder : uploadNewBuilder}
        >
          {edit ? "Update Builder" : "Add New Builder"}
          {!loading ? (
            <ImUpload />
          ) : (
            <HashLoader
              color="#ffffff"
              loading={loading}
              cssOverride={override}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </button>
        {edit ? (
          <button
            className={`cancelBtn btn btn-outline-danger rounded-2 d-flex gap-2 text-danger justify-content-center align-items-center`}
            onClick={cancelBuilderUpdate}
          >
            Cancel
          </button>
        ) : (
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
            placeholder="Write the builder name"
            onChange={(e) => setBuilderName(e.target.value)}
            value={builderName}
          />
          <p className="text-danger">{errors?.name?.msg}</p>
        </div>
      </div>
      {/* col 2 end */}

      {/* col 2 */}
      {/* <div className="col-sm-6 col-xl-4 d-flex mt0-xs mt35" style={{height: "54px"}}>
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
      </div> */}
      {/* col 2 end */}
    </div>
  );
};

export default BuildersHanlder;
