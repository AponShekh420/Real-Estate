'use client'

import getBlogs from "@/lib/getBlogs";
import { addBlogFilterValue } from "@/redux/blogFilterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


let searchIntervel;

const SearchBox = () => {

   // redux action
   const dispatch = useDispatch();
   const {titleSearch}= useSelector(state => state.blogFilter)
 
 
   const searchHandler = (e) => {
     clearInterval(searchIntervel)
     dispatch(addBlogFilterValue({
       titleSearch: e.target.value,
     }))
 
     searchIntervel = setTimeout(()=> {
       getBlogs()
     }, 1000)
   }


  return (
    <div className="sidebar-widget mb30">
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
    </div>
  );
};

export default SearchBox;
