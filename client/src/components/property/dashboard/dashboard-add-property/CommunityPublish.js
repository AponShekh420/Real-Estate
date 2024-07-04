"use client"
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCommunityFieldValue } from "@/redux/communitySlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CommunityPublish = () => {
  const [loading, setLoading] = useState(false);

  // redux
  const community = useSelector((state)=> state.community)
  const dispatch = useDispatch();

  const addCommunity = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/community/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...community
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        dispatch(removeAllCommunityFieldValue())
        toast(dataRes.msg)
      }
      console.log(dataRes)
    } catch(err) {
      console.log(err.message)
    }
  }




  return (
    <div className="dashboard_title_area">
      <button onClick={addCommunity} className={`bdr1 bg-black text-white rounded-3 shadow mb-5 py-2 px-3 d-flex gap-2 justify-content-center align-items-center fs-6 ${loading? "opacity-50" : "opacity-100"}`} disabled={loading}>
        Add Community
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
      <ToastContainer/>
    </div>
  );
}

export default CommunityPublish;