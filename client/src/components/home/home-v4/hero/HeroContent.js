"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [suggestion, setSuggestion] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "sold", label: "Sold" },
  ];

  return (
    <div className="advance-search-tab mt60 mt30-lg mx-auto animate-up-3">
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
                      <div className="box-search dropdown">
                        <span className="icon flaticon-home-1" />
                        <input
                          className="form-control bgc-f7 bdrs12 dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          type="text"
                          autoComplete="off"
                          name="search"
                          placeholder={`Search Products for ${tab.label}`}
                          onFocus={() => setSuggestion(true)}
                          onBlur={() => setSuggestion(false)}
                        />
                        <ul className={`dropdown-menu w-100 ${suggestion && "show"}`}>
                          <li className="bdrt1">
                            <button className="dropdown-item" type="button">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">Item title</p>
                                <p className="mb-0">Community</p>
                              </div>
                            </button>
                          </li>
                          <li className="bdrt1">
                            <button className="dropdown-item" type="button">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">Item title</p>
                                <p className="mb-0">Area</p>
                              </div>
                            </button>
                          </li>
                          <li className="bdrt1">
                            <button className="dropdown-item" type="button">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">Item title</p>
                                <p className="mb-0">state</p>
                              </div>
                            </button>
                          </li>
                          <li className="bdrt1">
                            <button className="dropdown-item" type="button">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">Item title</p>
                                <p className="mb-0">City</p>
                              </div>
                            </button>
                          </li>
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
                      onClick={() => router.push("/grid-full-3-col")}
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
