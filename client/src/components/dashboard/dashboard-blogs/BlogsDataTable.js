"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MoonLoader } from "react-spinners";
import DeleteBlog from "./DeleteBlog";



const getStatusStyle = (active) => {
  switch (active) {
    case false:
      return "pending-style style1";
    case true:
      return "pending-style style2";
    default:
      return "";
  }
};


const BlogsDataTable = ({blogsData, setDeleteData}) => {
  const {data} = blogsData;

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Date Published</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {data?.map((blog, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/blogs/${blog?.img}`}
                    alt={blog.img}
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/post/${blog?.slug}`}>{blog?.title}</Link>
                  </div>
                  <span className="list-text mb-0 text-capitalize" href="#" style={{fontWeight: 500, fontSize: "13px"}}>{blog?.catagory?.name}{blog.subcatagory ? `, ${blog.subcatagory.name}` : ``}</span>
                  <div className="list-price">
                    <p className="list-text mb-0" style={{fontWeight: "500", fontSize: "14px", color: "#8b2323"}} >{blog?.auther?.firstName} {blog?.auther?.lastName}</p>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">
              <Moment format="D MMM YYYY">
                {blog?.createdAt}
              </Moment>
            </td>
            <td className="vam">
              {blog.auther.email}
            </td>
            <td className="vam">
              <span className={getStatusStyle(blog.active)}>
                {blog?.active ? "Active": "panding"}
              </span>
            </td>
            <td className="vam">
              <div className="d-flex">
                <Link href={`/dashboard/edit-blog/${blog.slug}`}> 
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${blog?.slug}`}
                  >
                    <span className="fas fa-pen fa" />
                  </button>
                </Link>
                <ReactTooltip
                    id={`edit-${blog?.slug}`}
                    place="top"
                    content="Edit"
                  />
                

                <DeleteBlog blog={blog} setDeleteData={setDeleteData}/>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogsDataTable;
