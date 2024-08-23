import DeleteModal from "@/components/common/DeleteModal";
import { addStateFields } from "@/redux/stateSlice";
import { usePathname } from "next/navigation";
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


const StateItem = ({state}) => {
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // redux 
  const dispatch = useDispatch();


  // the state would be "Deactive" though this function
  const deactiveHanlder = async (e) => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/deactive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stateId: state._id
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
      } else {
        toast.error(`Please try again ${state.name} state`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stateId: state._id
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
      } else {
        toast.error(`Please try again ${state.name} state`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  
  const deleteHanlder = async (stateId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stateId: stateId,
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
        toast.error(`Please try again to delete "${state.name}" state`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHandler = () => {
    dispatch(addStateFields({
      stateName: state.name,
      desc: state.desc,
      abbreviation: state.abbreviation,
      active: state.active,
      edit: true,
      stateId: state._id,
      oldImgUrl: state.img,
      uploadedImageChanged: false,
      uploadedImage: state.img,
    }))
  }
  

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bdrb1 py-2">
        <p className={`text-capitalize m-0 ${path.split('/')[2] === state.slug ? "text-danger": ""}`}><b>{state.name} ({state.community.length})</b></p>
        <div className="d-flex align-items-center gap-3">

          <span
            className="text-capitalize"
            style={{cursor: "pointer", border: "none", color: `${state.active ? "green" : "red"}`, padding: `${loading ? state.active ? "2px 16px" : "2px 22px" : "1px 8px"}`, lineHeight: "1.5", borderRadius: "15px", border: `1px solid ${state.active ? "green" : "red"}`, fontSize: "12px"}}
            data-tooltip-id={`status-${state?.slug}`}
            onClick={state.active ? deactiveHanlder : activeHandler}
          >
            {loading ? (
              <MoonLoader
              color={state.active == true ? "green" : "red"}
              loading={loading}
              cssOverride={override}
              size={12}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            ): state.active ? "active" : "Deactive"}
            
          </span>

          <button
            className="icon btn"
            style={{ border: "none", color: "green", padding: "0px", fontSize: "15px"}}
            data-tooltip-id={`edit-${state?.slug}`}
            onClick={editHandler}
          > 
            <span className="fas fa-pen fa" />
          </button>

          <a 
            style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
            data-tooltip-id={`delete-${state?.slug}`}
            data-bs-target={`#exampleModalToggle-${state?._id}`}
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
            id={`edit-${state?.slug}`}
            place="top"
            content="Edit"
          />
          <ReactTooltip
            id={`delete-${state?.slug}`}
            place="top"
            content="Delete"
          />
          <ReactTooltip
            id={`status-${state?.slug}`}
            place="top"
            content={`${state.active ? "Click Me To Deactive": "Click Me To Active"}`}
          />
          <DeleteModal deleteHanlder={deleteHanlder} item={state} subject={"state"}/>
        </div>
      </div>
    </>
  );
}

export default StateItem;