"use client";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../common/Pagination";
import CommunitiesDataTable from "./CommunitiesDataTable";
import DraftCommunitiesDataTable from "./DraftCommunitiesDataTable";
import FilterHeader from "./FilterHeader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Container = () => {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("date_added_desc");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [communitiesData, setCommunitiesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [deletedData, setDeleteData] = useState({}); // deleted data notification
  const [totalPages, setTotalPages] = useState(1);
  //for draft
  const [draftCommunitiesData, setDraftCommunitiesData] = useState([]);
  const [deleteDraftData, setDraftDeleteData] = useState({}); // deleted data notification
  const [totalDraftPages, setTotalDraftPages] = useState(1);
  const [currentDraftPage, setCurrentDraftPage] = useState(1);

  const getCommunityData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/get-communities`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchParams: search,
            sortby: sortValue,
            active,
            limitStart: (currentPage - 1) * 10,
            limitEnd: currentPage * 10,
          }),
        }
      );
      const currentData = await res.json();
      console.log(currentData);
      setLoading(false);
      if (currentData.data) {
        setTotalPages(
          Math.ceil(currentData.lotalNumberOfData / 10) <= 1
            ? 1
            : Math.ceil(currentData.lotalNumberOfData / 10)
        );
        setCommunitiesData(currentData);
      } else {
        // message for server side error with toastify
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getDraftCommunityData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/draft`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchParams: search,
            sortby: sortValue,
            limitStart: (currentDraftPage - 1) * 10,
            limitEnd: currentDraftPage * 10,
          }),
        }
      );
      const currentData = await res.json();
      console.log(currentData);
      setLoading(false);
      if (currentData.data) {
        setTotalDraftPages(
          Math.ceil(currentData.lotalNumberOfData / 10) <= 1
            ? 1
            : Math.ceil(currentData.lotalNumberOfData / 10)
        );
        setDraftCommunitiesData(currentData);
      } else {
        // message for server side error with toastify
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCommunityData();
  }, [active, deletedData, currentPage]);

  useEffect(() => {
    getDraftCommunityData();
  }, [deleteDraftData, currentDraftPage]);

  //for optimizing search
  const debouncedSaveDraft = useCallback(
    debounce(() => {
      getCommunityData();
      getDraftCommunityData();
    }, 500),
    [search, sortValue]
  );
  useEffect(() => {
    debouncedSaveDraft();
    // Cleanup debounce on unmount
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [search, sortValue, debouncedSaveDraft]);

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-xxl-3">
          <div className="dashboard_title_area">
            <h2>My Community</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-xxl-9">
          <FilterHeader
            setSortValue={setSortValue}
            sortValue={sortValue}
            setSearch={setSearch}
            search={search}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
            onClick={() => {
              setActive(true);
            }}
          >
            1. Active
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
            onClick={() => {
              setActive(false);
            }}
          >
            2. Pending
          </button>
          <button
            className="nav-link fw600"
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
            onClick={() => {
              setActive(false);
            }}
          >
            2. Draft
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          {/* the table of community */}
          <div className="row">
            <div className="col-xl-12">
              <div
                className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative ${
                  loading
                    ? "d-flex justify-content-center align-items-center"
                    : ""
                }`}
              >
                <div
                  className={`packages_table table-responsive ${
                    loading
                      ? "d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                  style={loading ? { height: "500px" } : {}}
                >
                  {loading ? (
                    <div
                      className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    >
                      <MoonLoader
                        color="black"
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : communitiesData?.data?.length == 0 ? (
                    <h1
                      style={{ height: "400px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      No Data Found
                    </h1>
                  ) : (
                    <CommunitiesDataTable
                      communitiesData={communitiesData}
                      setDeleteData={setDeleteData}
                      key={1}
                    />
                  )}

                  <div className="mt30">
                    {loading ? (
                      <div></div>
                    ) : (
                      <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        data={communitiesData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* community table end */}
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          {/* the table of community */}
          <div className="row">
            <div className="col-xl-12">
              <div
                className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative ${
                  loading
                    ? "d-flex justify-content-center align-items-center"
                    : ""
                }`}
              >
                <div
                  className={`packages_table table-responsive ${
                    loading
                      ? "d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                  style={loading ? { height: "400px" } : {}}
                >
                  {loading ? (
                    <div
                      className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    >
                      <MoonLoader
                        color="black"
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : communitiesData?.data?.length == 0 ? (
                    <h1
                      style={{ height: "400px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      No Data Found
                    </h1>
                  ) : (
                    <CommunitiesDataTable
                      setDeleteData={setDeleteData}
                      communitiesData={communitiesData}
                      key={2}
                    />
                  )}

                  <div className="mt30">
                    {loading ? (
                      <div></div>
                    ) : (
                      <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        data={communitiesData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* community table end */}
        </div>
        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          {/* the table of community */}
          <div className="row">
            <div className="col-xl-12">
              <div
                className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative ${
                  loading
                    ? "d-flex justify-content-center align-items-center"
                    : ""
                }`}
              >
                <div
                  className={`packages_table table-responsive ${
                    loading
                      ? "d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                  style={loading ? { height: "400px" } : {}}
                >
                  {loading ? (
                    <div
                      className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    >
                      <MoonLoader
                        color="black"
                        loading={loading}
                        cssOverride={override}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : draftCommunitiesData?.data?.length == 0 ? (
                    <h1
                      style={{ height: "400px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      No Data Found
                    </h1>
                  ) : (
                    <DraftCommunitiesDataTable
                      setDraftDeleteData={setDraftDeleteData}
                      communitiesData={draftCommunitiesData}
                      key={3}
                    />
                  )}

                  <div className="mt30">
                    {loading ? (
                      <div></div>
                    ) : (
                      <Pagination
                        currentPage={currentDraftPage}
                        setCurrentPage={setCurrentDraftPage}
                        totalPages={totalDraftPages}
                        data={draftCommunitiesData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* community table end */}
        </div>
        {/* End tab for Upload photos of your property */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Container;
