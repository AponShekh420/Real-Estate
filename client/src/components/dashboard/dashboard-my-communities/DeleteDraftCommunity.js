import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const DeleteDraftCommunity = ({ community, setDraftDeleteData }) => {
  const [loading, setLoading] = useState(false);

  const deleteCommunity = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/draft/${community?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          credentials: "include",
        }
      );
      const currentData = await res.json();

      setLoading(false);
      if (currentData.msg) {
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setDraftDeleteData(currentData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {/* delete start */}
      {!loading ? (
        <button
          className="icon btn btn-primary"
          style={{ border: "none" }}
          data-tooltip-id={`delete-${community?._id}`}
          disabled={loading}
          onClick={deleteCommunity}
        >
          <span className="flaticon-bin" style={{ color: "red" }} />
        </button>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "10px 5px" }}
        >
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
        id={`delete-${community?._id}`}
        place="top"
        content="Delete"
      />
      {/* delete end */}
    </div>
  );
};

export default DeleteDraftCommunity;
