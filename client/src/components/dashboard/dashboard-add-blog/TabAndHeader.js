"use client"
import store from "@/redux/store";
import {Provider} from "react-redux"
import BlogPublish from "./BlogPublish";
import { usePathname } from "next/navigation";
import AddBlogTabContent from ".";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";


const TabAndHeader = () => {
  const pathname = usePathname();
  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;
  const submitBtn = useRef(null);

  return (
    <Provider store={store}>
      <div className="row align-items-center pb40">
        <div className="col-lg-12 d-flex justify-content-between">
          <div className="dashboard_title_area">
            <h2>{editPageValidation ? "Edit Blog" : "Add New Blog"}</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
          <BlogPublish submitBtn={submitBtn}/>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
            <div className="navtab-style1">
              <AddBlogTabContent submitBtn={submitBtn}/>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
      {/* End .row */}
    </Provider>
  );
}

export default TabAndHeader;