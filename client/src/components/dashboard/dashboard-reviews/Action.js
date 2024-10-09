"use client"
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Tooltip as ReactTooltip } from "react-tooltip";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const getStatusStyle = (active) => {
  switch (active) {
    case false:
      return "pending-style style1";
    case true:
      return "pending-style style2";
    default:
      return "";
  }
};


const Action = ({review, action}) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [status, setStatus] = useState(action);

  const statusHandler = async (id) => {
    try {
      setActionLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/review/approve-panding/${id}`, {
        credentials: "include",
        method: "PUT"
      });
      const currentData = await res.json();
      setActionLoading(false)
      if(currentData.msg) {
        setStatus(currentData.active)
      } else {
        console.log("data", currentData)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    setStatus(action);
  }, [review])

  return (
    <div>
      <button 
        className={`${getStatusStyle(status)} shadow-sm m0`} 
        style={{border: "none"}} 
        data-tooltip-id={`${review?._id}`}
        onClick={() => statusHandler(review?._id)}
      >
        {actionLoading ? (
          <MoonLoader
            color="red"
            loading={actionLoading}
            cssOverride={override}
            size={19}
            className="d-flex"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          status ? "Approved": "Panding"
        )}
      </button>
      <ReactTooltip
        id={`${review?._id}`}
        place="top"
        content={!status ? "Click To Approve" : "Click To Panding"}
      />
    </div>
  );
}

export default Action;