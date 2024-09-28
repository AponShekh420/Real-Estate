"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlogsListLoader from "./BlogsListLoader"
import Moment from "react-moment";
import getSpecificBlogs from "@/lib/getSpecificBlogs";


const RecentBlogs = ({total, blogsCatagory, dateStatus, notCatagory}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])


  const getRecentBlogs = async() => {
    try {
      setLoading(true);
      const data = await getSpecificBlogs(0, total, true, {_id: blogsCatagory}, null, null, {_id: notCatagory});
      setLoading(false);
      setData(data);
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    getRecentBlogs()
  }, [])

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          {loading ? (
            <BlogsListLoader contentNumber={dateStatus ? 6 : 3}/>
          ) : data?.map((blog) => (
            <div className="col-sm-6 col-lg-4" key={blog.id}>
              <Link href={`/blog/${blog?.slug}`} className="blog-style1">
                <div className="blog-img">
                  <Image
                    width={386}
                    height={271}
                    className="w-100 h-100 cover"
                    src={blog?.img}
                    alt="blog"
                  />
                </div>
                <div className="blog-content">
                  {dateStatus && (
                    <div className="date" style={{padding: "5px"}}>
                      <span className="month" style={{fontSize: "12px", fontWeight: 500, lineHeight: 1.4}}>
                        <Moment format="MMM">
                          {blog?.createdAt}
                        </Moment>
                      </span>
                      <span className="day" style={{fontSize: "12px", fontWeight: 500, lineHeight: 1.4}}>
                        <Moment format="D">
                          {blog?.createdAt}
                        </Moment>
                      </span>
                      <span className="day" style={{fontSize: "12px", fontWeight: 500, lineHeight: 1.4}}>
                        <Moment format="YYYY">
                          {blog?.createdAt}
                        </Moment>
                      </span>
                    </div>
                  )}
                  <a className="tag" href="#">
                    {blog?.tag}
                  </a>
                  <h6 className="title mt-1">
                    <Link href={`/blog/${blog?.slug}`}>{blog?.title}</Link>
                  </h6>
                </div>
              </Link>
            </div>))}
        </div>
      </div>
    </div>
  );
}

export default RecentBlogs;