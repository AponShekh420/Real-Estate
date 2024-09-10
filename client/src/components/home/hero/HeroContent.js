"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


let searchIntervel;

const HeroContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [suggestion, setSuggestion] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "Buy", label: "Buy" },
    { id: "Rent", label: "Rent" },
    { id: "Sold", label: "Sold" },
  ];


  const searchHanlder = async () => {
    setData([]);
    console.log("searchValue", search)
    if(search == "" || !search) {
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/suggestion/search`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          search,
          status: activeTab
        })
      });
      const resData = await res.json();
      console.log("searchData", resData)
      if(resData?.data) {
        setData(resData?.data)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    clearInterval(searchIntervel)
    searchIntervel = setTimeout(()=> {
      searchHanlder();
    }, 700)
  }, [activeTab, search])


  return (
    <div className="advance-search-tab mt0-sm mt0-md mx-auto animate-up-3" style={{marginTop: "-83px"}}>
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
            key={tab.id}
          >
            <div className="advance-content-style1">
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <div className="advance-search-field position-relative text-start">
                  <form className="form-search position-relative">
                    <div className="box-search dropdown position-relative">
                      <span className="icon flaticon-home-1" />
                      <input
                        className="form-control bgc-f7 bdrs12 dropdown-toggle"
                        type="text"
                        autoComplete="off"
                        name="search"
                        placeholder={`Enter a Community, State, Area or Blog`}
                        onFocus={() => setSuggestion(true)}
                        onBlur={(e) => {
                          // Check if the blur was triggered due to clicking on a link
                          if (!e.relatedTarget || !e.relatedTarget.classList.contains('dropdown-item')) {
                            setTimeout(() => setSuggestion(false), 100); // Delay to ensure link click is handled first
                          }
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                      />
                      <ul className={`position-absolute w-100 ${suggestion ? "d-block" : "d-none"} shadow-sm pl0`} style={{background: "white"}}>
                        {data?.communities?.map((community) => (
                          <Link href={`/community/${community?.slug}`} key={community?.slug} passHref>
                            <li className="bdrt1 dropdown-item" tabIndex={-1}>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-capitalize" style={{color: "#EE4C34", fontWeight: "500"}}>{community?.title}, {community?.state?.name}, USA</p>
                                <p className="mb-0" style={{color: "#EE4C34", fontWeight: "500"}}>Community</p>
                              </div>
                            </li>
                          </Link>
                        ))}
                        {data?.states?.map((state) => (
                          <Link href={`/summary/${state?.slug}`} key={state?.slug} passHref>
                            <li className="bdrt1 dropdown-item" tabIndex={-1}>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-capitalize" style={{color: "#EE4C34", fontWeight: "500"}}>{state?.name}, USA</p>
                                <p className="mb-0" style={{color: "#EE4C34", fontWeight: "500"}}>State</p>
                              </div>
                            </li>
                          </Link>
                        ))}
                        {data?.areas?.map((area) => (
                          <Link href={`/summary/${area?.state?.slug}/${area?.city?.slug}/${area?.slug}`} key={area?.slug} passHref>
                            <li className="bdrt1 dropdown-item" tabIndex={-1}>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-capitalize" style={{color: "#EE4C34", fontWeight: "500"}}>{area?.name}, {area?.state?.abbreviation}, USA</p>
                                <p className="mb-0" style={{color: "#EE4C34", fontWeight: "500"}}>Area</p>
                              </div>
                            </li>
                          </Link>
                        ))}
                        {data?.blogs?.map((blog) => (
                          <Link href={`/blog/${blog?.slug}`} key={blog?.slug} passHref>
                            <li className="bdrt1 dropdown-item" tabIndex={-1}>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-capitalize" style={{color: "#EE4C34", fontWeight: "500"}}>{blog?.title}</p>
                                <p className="mb-0" style={{color: "#EE4C34", fontWeight: "500"}}>Blog</p>
                              </div>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </form>

                  </div>
                </div>
                {/* End .col-md-8 */}

                <div className="col-md-4 col-lg-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModal"
                    >
                      <span className="flaticon-settings" /> Advanced
                    </button>
                    <button
                      className="advance-search-icon ud-btn btn-dark ms-4"
                      type="button"
                      onClick={() => router.push("/summary")}
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
