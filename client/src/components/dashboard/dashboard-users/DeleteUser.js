import { Tooltip as ReactTooltip } from "react-tooltip";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const DeleteUser = ({user, setDeleteData}) => {
  const [loading, setLoading] = useState(false);

  const deleteUserHanlder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/delete/${user?._id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify({
          blogId: user?._id
        })
      });
      const currentData = await res.json();
      setLoading(false)
      if(currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setDeleteData(currentData);
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      {/* delete start */}
      {!loading ? (
        <button
          className="icon btn btn-primary"
          style={{ border: "none" }}
          data-tooltip-id={`delete-${user?._id}`}
          // data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
          disabled={loading}
          onClick={deleteUserHanlder}
        >
          <span className="flaticon-bin" style={{color: "red"}}/>
        </button>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{padding: "15px 5px"}}>
        <MoonLoader
          color="red"
          loading={loading}
          cssOverride={override}
          size={14}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      )}
      
        
      <ReactTooltip
        id={`delete-${user?._id}`}
        place="top"
        content="Delete"
      />
      {/* delete end */}
    </div>
  );
}

export default DeleteUser;