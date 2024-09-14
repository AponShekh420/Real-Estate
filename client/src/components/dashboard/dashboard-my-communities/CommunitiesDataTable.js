"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MoonLoader } from "react-spinners";
import DeleteCommunity from "./DeleteCommunity";



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



const CommunitiesDataTable = ({communitiesData, setDeleteData}) => {
  const {data} = communitiesData;

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Listing title</th>
          <th scope="col">Date Published</th>
          <th scope="col">Listed-In</th>
          <th scope="col">Status</th>
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
                    src={community?.thumbnail || community?.imgs[community?.imgs?.length -1]}
                    alt="community"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/community/${community?.slug}`}>{community?.title}</Link>
                  </div>
                  <p className="list-text mb-0">{community?.city?.name} city, {community?.state?.abbreviation}, USA</p>
                  <div className="list-price">
                    <a href="#">Price: ${community?.minPrice}-${community?.maxPrice}</a>
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
              <span className={getStatusStyle(community?.active)}>
                {community?.active ? "Active": "panding"}
              </span>
            </td>
            <td className="vam">{community?.status.map((item, index) => (community?.status?.length > (index + 1)) ? `${item}/`: item)}</td>
            <td className="vam">
              <div className="d-flex">
                <Link href={`/dashboard/edit-community/${community?.slug}`}> 
                  <button
                    className="icon btn btn-primary p-1"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${community?.slug}`}
                  >
                    <span className="fas fa-pen fa" style={{color: "green"}}/>
                  </button>
                </Link>
                <ReactTooltip
                    id={`edit-${community?.slug}`}
                    place="top"
                    content="Edit"
                  />
                

                <DeleteCommunity community={community} setDeleteData={setDeleteData}/>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommunitiesDataTable;
