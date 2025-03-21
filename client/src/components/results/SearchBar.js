"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { addResultsFilterValue, removeResultsFilterValues } from "@/redux/resultFilterSlice";


let searchIntervel;

const SearchBar = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState(true);
  const {data, currentFilterType, titleSearch} = useSelector(state => state.resultsFilter)
  
  const dispatch = useDispatch();


  const searchResult = async (e) => {
    e && e?.preventDefault();
    if(titleSearch == "" || !titleSearch) {
      return;
    }
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
          filterData: currentFilterType.length < 1 ? ["State", "Area", "City", "Blog", "Communities"] : currentFilterType
        })
      });
      const resData = await res.json();
      console.log("searchData", resData)
      if(resData?.data) {
        dispatch(addResultsFilterValue(resData))
        // setData(resData?.data)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    searchResult()
  }, [currentFilterType])

  return (
    <>
      <div className="advance-search-tab advance-search-tab-result mt0-sm mt0-md mx-auto">
        <div className="tab-content" style={{borderTopLeftRadius: "12px"}}>
            <div
              className={"active"}
            >
              <div className="advance-content-style1">
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="advance-search-field position-relative text-start">
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


      {/* data list */}
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






        {/* {(currentFilterType.length < 1 || currentFilterType.includes("Communities")) && (
          data?.communities?.map((community) => (
            
          ))
        )}

        {(currentFilterType.length < 1 || currentFilterType.includes("State")) && (
          data?.states?.map((state) => (
            
          ))
        )}

        
        {(currentFilterType.length < 1 || currentFilterType.includes("Area")) && (
          data?.areas?.map((area) => (
            
          )))
        }

        {(currentFilterType.length < 1 || currentFilterType.includes("City")) && (
          data?.cities?.map((city) => (
            
          )))
        }

        {(currentFilterType.length < 1 || currentFilterType.includes("Blog")) && (
          data?.blogs?.map((blog) => (
            
          )))
        } */}
      </ul>
    </>
  );
};

export default SearchBar;
