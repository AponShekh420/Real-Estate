"use client";
import {
  addCommunityFieldValue,
  removeAllCommunityFieldValue,
} from "@/redux/communitySlice";
import store from "@/redux/store";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPropertyTabContent from ".";
import CommunityPublish from "./CommunityPublish";

const TabAndHeader = () => {
  const community = useSelector((state) => state.community);
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const editPageValidation =
    pathname.split("/")[2] === "edit-community" ? true : false;
  const submitBtn = useRef(null);
  const showbtn = (isBtn) => {
    setIsDraft(isBtn);
  };

  const deleteDraftCommunity = async (removeImg = true) => {
    const communityId = localStorage.getItem("draftCommunityId");
    if (communityId) {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/draft/${communityId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
              removeImg: removeImg,
            }),
          }
        );
        const currentData = await res.json();
        setLoading(false);
        if (currentData.msg) {
          localStorage.removeItem("draftCommunityId");
          dispatch(removeAllCommunityFieldValue());
          dispatch(
            addCommunityFieldValue({
              loading: false,
            })
          );
          setIsDraft(false);
          if (removeImg) {
            toast.success("Draft deleted successfuly", {
              position: "top-right",
              autoClose: 1500,
            });
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <Provider store={store}>
      <div className="row align-items-center pb40">
        <div className="col-lg-12 d-flex justify-content-between">
          <div className="dashboard_title_area">
            <h2>
              {editPageValidation ? "Edit Community" : "Add New Community"}
            </h2>
            <p className="text">We are glad to see you again!</p>
          </div>

          <div className="d-flex flex-column-reverse flex-md-row  gap-md-4 align-items-sm-start ">
            {!editPageValidation && isDraft && (
              <button
                onClick={() => deleteDraftCommunity()}
                type="button"
                className="ud-btn btn-thm py-2 px-3 rounded-1 text-capitalize text-nowrap fw-normal"
              >
                {loading ? "clearing.." : "clear draft"}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-copy-x"
                >
                  <line x1="12" x2="18" y1="12" y2="18" />
                  <line x1="12" x2="18" y1="18" y2="12" />
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            )}

            <CommunityPublish submitBtn={submitBtn} />
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
            <div className="navtab-style1">
              <AddPropertyTabContent
                deleteDraftCommunity={deleteDraftCommunity}
                showbtn={showbtn}
                submitBtn={submitBtn}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      {/* End .row */}
    </Provider>
  );
};

export default TabAndHeader;
