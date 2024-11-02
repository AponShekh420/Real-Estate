"use client"
import HashLoader from "react-spinners/HashLoader";
import { ImUpload } from "react-icons/im";
import { useSelector } from "react-redux";
import {usePathname} from "next/navigation";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BlogPublish = ({submitBtn}) => {
  // redux
  const {loading} = useSelector(state =>  state?.blog)


  const pathname = usePathname();
  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;


  return (
    <div className="dashboard_title_area">
      <button onClick={()=> submitBtn.current.click()} className={`bdr1 bg-black text-white rounded-3 shadow mb-5 py-2 px-3 d-flex gap-2 justify-content-center align-items-center fs-6 ${loading? "opacity-50" : "opacity-100"}`} disabled={loading}>
        {editPageValidation ? "Blog Update" : "Add Blog"}
        {!loading ? <ImUpload /> : <HashLoader
        color="#ffffff"
        loading={loading}
        cssOverride={override}
        size={17}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      }
      </button>
    </div>
  );
}

export default BlogPublish;