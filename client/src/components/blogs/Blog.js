"use client";
import getBlogs from "@/lib/getBlogs";
import { addBlogFilterValue } from "@/redux/blogFilterSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogsListLoader from "./BlogsListLoader"
import Moment from "react-moment";

const Blogs = ({blogFilter}) => {  
  // redux
  const dispatch = useDispatch();
  const { catagory, subcatagory, data, loading, currentPage } = useSelector(state => state.blogFilter);
  
  const {catagory: catagoryProps, subcatagory: subcatagoryProps} = blogFilter;

  useEffect(()=> {
    dispatch(addBlogFilterValue({
      catagory: catagoryProps,
      subcatagory: subcatagoryProps,
    }))
    getBlogs()
    // console.log("titleSearch:", titleSearch)
  }, [catagory, subcatagory, currentPage])

  return (
    <>
      <div className="row">
        {loading ? (
          <BlogsListLoader/>
        ) : (data.length > 0) ? (
          data?.map((blog) => (
            <div className="col-sm-6 col-lg-4" key={blog.id}>
              <Link href={`/blog/${blog?.slug}`}>
                <div className="blog-style1">
                  <div className="blog-img">
                    <Image
                      width={386}
                      height={271}
                      className="w-100 h-100 cover"
                      src={blog.img}
                      alt="blog"
                    />
                  </div>
                  <div className="blog-content">
                    <div className="date">
                      <span className="month" style={{fontSize: "13px", fontWeight: 400}}>
                        <Moment format="MMM">
                          {blog?.createdAt}
                        </Moment>
                      </span>
                      <span className="day" style={{fontSize: "13px", fontWeight: 400}}>
                        <Moment format="D">
                          {blog?.createdAt}
                        </Moment>
                      </span>
                    </div>
                    <a className="tag" href="#">
                      {blog?.tag}
                    </a>
                    <h6 className="title mt-1">
                      <Link href={`/blog/${blog?.slug}`}>{blog?.title}</Link>
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <h1 style={{height: "600px"}} className="d-flex align-items-center justify-content-center">No Data Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
