"use client";
import { usePathname } from "next/navigation";
import { ImUpload } from "react-icons/im";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CommunityPublish = ({ submitBtn }) => {
  const { loading } = useSelector((state) => state.community);
  const pathname = usePathname();

  const editPageValidation =
    pathname.split("/")[2] === "edit-community" ? true : false;

  const communityhandler = () => {
    submitBtn.current.click();
  };

  return (
    <div className="dashboard_title_area">
      <button
        onClick={communityhandler}
        className={`bdr1 bg-black text-white rounded-3 shadow mb-3 mb-md-5 py-2 px-3 d-flex gap-2 justify-content-center align-items-center fs-6 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
        disabled={loading}
      >
        {editPageValidation ? "Update Community" : "Add Community"}
        {!loading ? (
          <ImUpload />
        ) : (
          <HashLoader
            color="#ffffff"
            loading={loading}
            cssOverride={override}
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </button>
    </div>
  );
};

export default CommunityPublish;
