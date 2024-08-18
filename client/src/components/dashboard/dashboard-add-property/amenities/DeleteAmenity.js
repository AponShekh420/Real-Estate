"use client"
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const DeleteAmenity = ({amenity, columnKey, setNotify, checkHanlder}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

   // delete amenity
   const deleteHanlder = async (id) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenity/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
        })
      })
      const dataRes = await res.json();
      setDeleteLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        checkHanlder({target: {checked: false}}, amenity)
        setNotify(Math.random());
      } else {
        toast.error(`Please try again to delete amenity`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <>
      <a 
        style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
        data-tooltip-id={`delete-${columnKey}`}
        data-bs-target={`#exampleModalToggle-${amenity?._id}`}
        data-bs-toggle={`${deleteLoading ? null : "modal"}`}
        
      >
        {deleteLoading ? (
          <MoonLoader
            color={"red"}
            loading={deleteLoading}
            cssOverride={override}
            size={11}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ): <MdDeleteForever 
            size={16} 
            color="red" 
            cursor="pointer"
            data-tooltip-id={`delete-${columnKey}`}
            data-bs-target={`#exampleModalToggle-${amenity?._id}`}
            data-bs-toggle="modal"
          />}
      </a>
      <DeleteModal item={amenity} deleteHanlder={deleteHanlder} subject="Amenity"/>
    </>
  );
}

export default DeleteAmenity;