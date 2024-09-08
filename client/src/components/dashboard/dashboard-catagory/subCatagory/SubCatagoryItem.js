import { addSubcatagoryFields } from "@/redux/subCatagorySlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeleteModal from "../../../common/DeleteModal";
import { addCatagoryFields } from "@/redux/catagorySlice";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const SubCatagoryItem = ({eachSubcatagory, catagory}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  // redux 
  const {subcatagoryName, edit} = useSelector(state => state.subcatagory);
  const dispatch = useDispatch();



  const deleteHanlder = async (subcatagoryId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/subcatagory/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subcatagoryId: subcatagoryId
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
        toast.error(`Please try again to delete "${catagory.name}" subcatagory`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHandler = () => {
    dispatch(addSubcatagoryFields({
      catagoryId: catagory,
      subcatagoryName: eachSubcatagory.name,
      edit: true,
      subcatagoryId: eachSubcatagory._id,
    }))
  }



  return (
    <>
      <div className="d-flex justify-content-between align-items-center bdrb1 py-2">
        <p className={`text-capitalize m-0`}>-{eachSubcatagory.name} ({eachSubcatagory.blogs.length})</p>
        <div className="d-flex align-items-center gap-3">

            <button
              className="icon btn"
              style={{ border: "none", color: "green", padding: "0px", fontSize: "15px"}}
              data-tooltip-id={`edit-${eachSubcatagory?.slug}`}
              onClick={editHandler}
            > 
              <span className="fas fa-pen fa" />
            </button>

            <a 
            style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
            data-tooltip-id={`delete-${eachSubcatagory?.slug}`}
            data-bs-target={`#exampleModalToggle-${eachSubcatagory?._id}`}
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
              id={`edit-${eachSubcatagory?.slug}`}
              place="top"
              content="Edit"
            />
            <ReactTooltip
              id={`delete-${eachSubcatagory?.slug}`}
              place="top"
              content="Delete"
            />
            <DeleteModal deleteHanlder={deleteHanlder} item={eachSubcatagory} subject={"subcatagory"}/>
          </div>
      </div>
    </>
  );
}

export default SubCatagoryItem;