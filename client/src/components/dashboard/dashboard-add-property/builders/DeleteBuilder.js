"use client";
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

const DeleteBuilder = ({ builder, setNotify }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  // delete amenity
  const deleteHanlder = async (id) => {
    try {
      setDeleteLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/delete`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      const dataRes = await res.json();
      setDeleteLoading(false);
      if (dataRes.msg) {
        setNotify({
          msg: "Delete",
          builder: builder,
        });
      } else {
        toast.error(`Please try again to delete amenity`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <a
        style={{
          border: "none",
          color: "red",
          padding: "0px",
          fontSize: "16px",
          cursor: "pointer",
        }}
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
        ) : (
          <MdDeleteForever
            size={16}
            color="red"
            cursor="pointer"
            data-tooltip-id={`delete-${builder?._id}`}
            data-bs-target={`#exampleModalToggle-${builder?._id}`}
            data-bs-toggle="modal"
          />
        )}
      </a>
      <DeleteModal
        item={builder}
        deleteHanlder={deleteHanlder}
        subject="builder"
      />
    </>
  );
};

export default DeleteBuilder;
