import DeleteModal from "@/components/common/DeleteModal";
import { addAreaFields } from "@/redux/areaSlice";
import { addStateFields } from "@/redux/stateSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const AreaItem = ({eachArea, state}) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // redux 
  const {active, areaName, description, abbreviation, edit} = useSelector(state => state.area);
  const dispatch = useDispatch();


  // the state would be "Deactive" though this function
  const deactiveHanlder = async (e) => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/deactive`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          areaId: eachArea._id
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else if (dataRes?.errors?.locationUpdate) {
        toast.error(`First, Take care the parent of "${eachArea.name}"`, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Please try again "${eachArea.name}" area`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  // the state would be "Active" though this function
  const activeHandler = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/active`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          areaId: eachArea._id
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else if (dataRes?.errors?.locationUpdate) {
        toast.error(`First, Take care the parent of "${eachArea?.name}"`, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Please try again "${eachArea?.name}" area`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const deleteHanlder = async (areaId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          areaId: areaId,
        })
      })
      const dataRes = await res.json();
      setDeleteLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        toast.error(`Please try again to delete "${state.name}" area`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHandler = () => {
    dispatch(addAreaFields({
      stateId: state,
      areaName: eachArea.name,
      desc: eachArea.desc,
      abbreviation: eachArea.abbreviation,
      active: eachArea.active,
      edit: true,
      areaId: eachArea._id,
      oldImgUrl: eachArea.img,
      uploadedImageChanged: false,
      uploadedImage: eachArea.img,
    }))
  }



  return (
    <>
      <div className="d-flex justify-content-between align-items-center bdrb1 py-2">
        <p className={`text-capitalize m-0`}>-{eachArea?.name} ({eachArea?.community?.length})</p>
        <div className="d-flex align-items-center gap-3">

            <span
              className="text-capitalize"
              style={{cursor: "pointer", border: "none", color: `${eachArea.active ? "green" : "red"}`, padding: `${loading ? eachArea.active ? "2px 16px" : "2px 22px" : "1px 8px"}`, lineHeight: "1.5", borderRadius: "15px", border: `1px solid ${eachArea.active ? "green" : "red"}`, fontSize: "12px"}}
              data-tooltip-id={`status-${eachArea?.slug}`}
              onClick={eachArea.active ? deactiveHanlder : activeHandler}
            >
              {loading ? (
                <MoonLoader
                color={eachArea.active == true ? "green" : "red"}
                loading={loading}
                cssOverride={override}
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              ): eachArea.active ? "active" : "Deactive"}
              
            </span>

            <button
              className="icon btn"
              style={{ border: "none", color: "green", padding: "0px", fontSize: "15px"}}
              data-tooltip-id={`edit-${eachArea?.slug}`}
              onClick={editHandler}
            > 
              <span className="fas fa-pen fa" />
            </button>

            <a 
            style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
            data-tooltip-id={`delete-${eachArea?.slug}`}
            data-bs-target={`#exampleModalToggle-${eachArea?._id}`}
            data-bs-toggle="modal"
          >
            {deleteLoading ? (
              <MoonLoader
              color={"red"}
              loading={deleteLoading}
              cssOverride={override}
              size={12}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            ): <span className="flaticon-bin" />}
          </a>
            
            <ReactTooltip
              id={`edit-${eachArea?.slug}`}
              place="top"
              content="Edit"
            />
            <ReactTooltip
              id={`delete-${eachArea?.slug}`}
              place="top"
              content="Delete"
            />
            <ReactTooltip
              id={`status-${eachArea?.slug}`}
              place="top"
              content={`${eachArea.active ? "Click Me To Deactive": "Click Me To Active"}`}
            />
            <DeleteModal deleteHanlder={deleteHanlder} item={eachArea} subject={"Area"}/>
          </div>
      </div>
    </>
  );
}

export default AreaItem;