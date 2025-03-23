"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { addResultsFilterValue, removeResultsFilterValues } from "@/redux/resultFilterSlice";
import { MoonLoader } from "react-spinners";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#EB6753",
};

let searchIntervel;

const SearchBar = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState(true);
  const {data, currentFilterType, titleSearch, loading, currentPage} = useSelector(state => state.resultsFilter)
  
  const dispatch = useDispatch();


  const searchResult = async (e) => {
    e && e?.preventDefault();
    e && dispatch(addResultsFilterValue({
        data: [],
        totalPages: 1,
        currentPage: 1,
        lotalNumberOfData: 0,
        resultsTitle: titleSearch,
      }))
    if(titleSearch == "" || !titleSearch) {
      dispatch(addResultsFilterValue({
        data: [],
        totalPages: 1,
        currentPage: 1,
        lotalNumberOfData: 0,
      }))
      return;
    }
    dispatch(addResultsFilterValue({
      loading: true,
    }))
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/suggestion/results`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          search: titleSearch,
          filterData: currentFilterType.length < 1 ? ["State", "Area", "City", "Blog", "Communities"] : currentFilterType,
          limitStart: (currentPage - 1) * 20,
          limitEnd: currentPage * 20,
        })
      });
      const resData = await res.json();
      dispatch(addResultsFilterValue({
        loading: false
      }))
      if(resData) {
        dispatch(addResultsFilterValue({
          ...resData,
          totalPages: Math.ceil(resData.lotalNumberOfData / 20) <= 1
          ? 1
          : Math.ceil(resData.lotalNumberOfData / 20)
        }))
        // setData(resData?.data)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    searchResult()
  }, [currentFilterType, currentPage])

  return (
    <>
      <div className="advance-search-tab advance-search-tab-result mt0-sm mt0-md mx-auto">
        <div className="tab-content" style={{borderTopLeftRadius: "12px"}}>
            <div
              className={"active"}
            >
              <div className="advance-content-style1">
                <div className="d-flex align-items-center resultsSearchCustomRow">
                  <div className="resultsSearchBar">
                    <div className="advance-search-field position-relative text-start w-100">
                    <form className="form-search position-relative" onSubmit={searchResult} action={"#"}>
                      <div className="box-search dropdown position-relative">
                        <span className="icon flaticon-home-1" />
                        <input
                          className="form-control bgc-f7 bdrs12 dropdown-toggle"
                          type="text"
                          autoComplete="off"
                          name="search"
                          placeholder={`Enter a Community, State, Area or Blog`}
                          onChange={(e) => 
                            dispatch(addResultsFilterValue({
                              titleSearch: e.target.value
                            }))
                          }
                          value={titleSearch}
                        />
                      </div>
                    </form>

                    </div>
                  </div>
                  {/* End .col-md-8 */}

                  <div className="resultsMenu">
                    <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-md-0">
                      <button
                        className="advance-search-btn d-lg-block d-none"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModal"
                      >
                        <span className="flaticon-settings" /> Advanced
                      </button>
                      <button
                        className="advance-search-icon ud-btn btn-dark ms-4"
                        type="button"
                        onClick={searchResult}
                      >
                        <span className="flaticon-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {loading ? (
        <div
        className="w-100 d-flex justify-content-center align-items-center text-white"
        style={{ height: "300px"}}
        >
          <MoonLoader
            color="#EB6753"
            loading={loading}
            cssOverride={override}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data.length > 0 ? (
        <ul className={`w100 ${suggestion ? "d-block" : "d-none"} mt15`}>
          {
            data.map((item, index) => {
              // console.log("typeCheking:", item.type)
              if(item?.type == 'community') {
                // console.log("item", item)
                return (
                  <Link href={`/community/${item?.slug}`} key={item?.slug} passHref>
                    <li className="bdrt1 dropdown-item" tabIndex={-1}>
                      <div className="d-flex flex-wrap gap-sm-0 gap-1 justify-content-between align-items-cente">
                        <p className="mb-0 text-capitalize text-wrap" style={{color: "#EE4C34", fontWeight: "500"}}>{item?.title}, {item?.state?.name}</p>
                        <p className="mb-0">Community</p>
                      </div>
                    </li>
                  </Link>
                )

              } else if(item?.type == 'blog') {
                return (
                  <Link href={`/blog/${item?.slug}`} key={item?.slug} passHref>
                    <li className="bdrt1 dropdown-item" tabIndex={-1}>
                      <div className="d-flex flex-wrap gap-sm-0 gap-1 justify-content-between align-items-center">
                        <p className="mb-0 text-capitalize text-wrap" style={{color: "#EE4C34", fontWeight: "500"}}>{item?.title}</p>
                        <p className="mb-0">Blog</p>
                      </div>
                    </li>
                  </Link>
                )
              } else if(item?.type == 'city') {
                return (
                  <Link href={`/summary/${item?.state?.slug}/${item?.area.slug}/${item?.slug}`} key={item?.slug} passHref>
                    <li className="bdrt1 dropdown-item" tabIndex={-1}>
                      <div className="d-flex flex-wrap gap-sm-0 gap-1 justify-content-between align-items-center">
                        <p className="mb-0 text-capitalize text-wrap" style={{color: "#EE4C34", fontWeight: "500"}}>{item?.name}, {item?.state?.abbreviation}</p>
                        <p className="mb-0">City</p>
                      </div>
                    </li>
                  </Link>
                )
              } else if(item?.type == 'area') {
                return (
                  <Link href={`/summary/${item?.state?.slug}/${item?.slug}`} key={item?.slug} passHref>
                    <li className="bdrt1 dropdown-item" tabIndex={-1}>
                      <div className="d-flex flex-wrap gap-sm-0 gap-1 justify-content-between align-items-center">
                        <p className="mb-0 text-capitalize text-wrap" style={{color: "#EE4C34", fontWeight: "500"}}>{item?.name}, {item?.state?.abbreviation}</p>
                        <p className="mb-0">Area</p>
                      </div>
                    </li>
                  </Link>
                )
              } else if(item?.type == 'state') {
                console.log("why it got", item)
                return (
                  <Link href={`/summary/${item?.slug}`} key={item?.slug} passHref>
                    <li className="bdrt1 dropdown-item" tabIndex={-1}>
                      <div className="d-flex flex-wrap gap-sm-0 gap-1 justify-content-between align-items-center">
                        <p className="mb-0 text-capitalize text-wrap" style={{color: "#EE4C34", fontWeight: "500"}}>{item?.name}</p>
                        <p className="mb-0">State</p>
                      </div>
                    </li>
                  </Link>
                )
              } else {
                return;
              }
              
            })
          }
        </ul> ) : (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <h1
            style={{ height: "300px" }}
            className="d-flex align-items-center justify-content-center"
          >
            No Data Found
          </h1>
        </div>
      )}
    </>
  );
};

export default SearchBar;
