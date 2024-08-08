import { addCatagoryFields } from "@/redux/catagorySlice";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteModal from "../../../common/DeleteModal";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const CatagoryItem = ({catagory}) => {
  const path = usePathname();
  const [deleteLoading, setDeleteLoading] = useState(false);

  // redux 
  const {catagoryName, edit} = useSelector(state => state.catagory);
  const dispatch = useDispatch();


  
  const deleteHanlder = async (catagoryId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch("http://localhost:5000/api/catagory/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catagoryId: catagoryId,
        })
      })
      const dataRes = await res.json();
      setDeleteLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addCatagoryFields({
          notify: Math.random(),
        }))
      } else {
        toast.error(`Please try again to delete "${catagory.name}" catagory`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHandler = () => {
    dispatch(addCatagoryFields({
      catagoryName: catagory.name,
      edit: true,
      catagoryId: catagory._id,
    }))
  }
  

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bdrb1 py-2">
        <p className={`text-capitalize m-0 ${path.split('/')[2] === catagory.slug ? "text-danger": ""}`}><b>{catagory.name} ({catagory.blogs.length})</b></p>
        <div className="d-flex align-items-center gap-3">

          {catagory.slug !== "uncatagory" && (
            <button
              className="icon btn"
              style={{ border: "none", color: "green", padding: "0px", fontSize: "15px"}}
              data-tooltip-id={`edit-${catagory?.slug}`}
              onClick={editHandler}
            > 
              <span className="fas fa-pen fa" />
            </button>
          )}

          {catagory.slug !== "uncatagory" && (
            <a 
              style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
              data-tooltip-id={`delete-${catagory?.slug}`}
              data-bs-target={`#exampleModalToggle-${catagory?._id}`}
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
          )}
          
          <ReactTooltip
            id={`edit-${catagory?.slug}`}
            place="top"
            content="Edit"
          />
          <ReactTooltip
            id={`delete-${catagory?.slug}`}
            place="top"
            content="Delete"
          />
          <DeleteModal deleteHanlder={deleteHanlder} item={catagory} subject={"catagory"}/>
        </div>
      </div>
    </>
  );
}

export default CatagoryItem;