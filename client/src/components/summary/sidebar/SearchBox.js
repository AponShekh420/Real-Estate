'use client'

import getCommunities from "@/lib/getCommunities";
import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


let searchIntervel;
const SearchBox = () => {
  // redux action
  const dispatch = useDispatch();
  const {titleSearch}= useSelector(state => state.communityFilter)


  const searchHandler = (e) => {
    clearInterval(searchIntervel)
    dispatch(addCommunityFilterValue({
      titleSearch: e.target.value,
    }))

    searchIntervel = setTimeout(()=> {
      getCommunities()
    }, 1000)
  }



  return (
    <div className="search_area">
      <input
        type="text"
        className="form-control"
        placeholder="What are you looking for?"
        onChange={(e)=> searchHandler(e)}
        value={titleSearch}
      />
      <label>
        <span className="flaticon-search" />
      </label>
    </div>
  );
};

export default SearchBox;
