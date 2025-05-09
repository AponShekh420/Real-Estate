"use client";

import getCommunities from "@/lib/getCommunities";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import { useDispatch, useSelector } from "react-redux";

let searchIntervel;
const TopFilterBar2 = ({ filterFunctions }) => {
  // redux action
  const dispatch = useDispatch();
  const { titleSearch } = useSelector((state) => state.communityFilter);

  const searchHandler = (e) => {
    clearInterval(searchIntervel);
    dispatch(
      addCommunityFilterValue({
        titleSearch: e.target.value,
      })
    );

    searchIntervel = setTimeout(() => {
      getCommunities();
    }, 1000);
  };

  return (
    <>
      <li className="list-inline-item position-relative">
        <input
          type="text"
          className="form-control search-field"
          placeholder="Search for community by name"
          onChange={(e) => searchHandler(e)}
          value={titleSearch}
        />
      </li>

      {/* End li Listing Status */}

      {/* End li Property Type */}

      <li className="list-inline-item">
        {/* Advance Features modal trigger */}
        <button
          type="button"
          className="open-btn mb15"
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" /> Advance Filter
        </button>
      </li>
    </>
  );
};

export default TopFilterBar2;
