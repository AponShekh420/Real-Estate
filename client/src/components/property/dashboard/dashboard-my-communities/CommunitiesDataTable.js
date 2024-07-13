"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { Tooltip as ReactTooltip } from "react-tooltip";

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



const CommunitiesDataTable = ({communitiesData}) => {
  const {data} = communitiesData
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Listing title</th>
          <th scope="col">Date Published</th>
          <th scope="col">Listed-In</th>
          <th scope="col">View</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {data?.map((community, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={`http://localhost:5000/assets/communityImgs/${community?.imgs[community.imgs.length -1]}`}
                    alt="community"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/community/${community?.slug}`}>{community?.title}</Link>
                  </div>
                  <p className="list-text mb-0">{community?.city?.name}</p>
                  <div className="list-price">
                    <a href="#">Price: ${community.minPrice}-${community?.maxPrice}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">
              <Moment format="D MMM YYYY">
                {community?.createdAt}
              </Moment>
            </td>
            <td className="vam">
              <span className={getStatusStyle(community.active)}>
                {community?.active ? "Active": "panding"}
              </span>
            </td>
            <td className="vam">{community?.createdAt}</td>
            <td className="vam">
              <div className="d-flex">
                <Link href={`/dashboard/edit-community/${community.slug}`}> 
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${community?._id}`}
                  >
                    <span className="fas fa-pen fa" />
                  </button>
                </Link>

                {/* model */}

                <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Confirmation On Delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Show a second modal and hide this one with the button below.
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger text-white" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* model end */}

                <button
                  className="icon btn btn-primary"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${community?._id}`}
                  data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                >
                  <span className="flaticon-bin" />
                </button>

                  <ReactTooltip
                    id={`edit-${community?.slug}`}
                    place="top"
                    content="Edit"
                  />
                <ReactTooltip
                  id={`delete-${community?._id}`}
                  place="top"
                  content="Delete"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommunitiesDataTable;
