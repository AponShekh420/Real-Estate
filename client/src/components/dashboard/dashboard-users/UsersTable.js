"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MoonLoader } from "react-spinners";
import DeleteUser from "./DeleteUser";



const getProviderStyle = (provider) => {
  switch (provider) {
    case "google":
      return "pending-style style1";
    case "facebook":
      return "pending-style style2";
    case "local":
      return "pending-style style3";
    default:
      return "";
  }
};

const getRoleStyle = (role) => {
  switch (role) {
    case "viewer":
      return "pending-style style3";
    case "contributor":
      return "pending-style style1";
    case "admin":
      return "pending-style style2";
    default:
      return "";
  }
};


const UsersTable = ({usersData, setDeleteData}) => {
  const {data} = usersData;

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Creation Date</th>
          <th scope="col">Email</th>
          <th scope="col">role</th>
          <th scope="col">provider</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {data?.map((user, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="col-12">
                <div className="message_container" style={{boxShadow: "none", borderRadius: "none"}}>
                  <div className="user_heading p-0" style={{border: "none"}}>
                    <div className="wrap d-flex align-content-center">
                      <span className="contact-status online" />
                      <Image
                        width={50}
                        height={50}
                        style={{objectFit: "cover"}}
                        className="rounded-circle"
                        src={user?.avatar?.split("/")[2] !== "lh3.googleusercontent.com" ? user?.avatar ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/users/${user?.avatar}` : "/images/user_avatar.png" : user?.avatar}
                        alt={user?.firstName + " " + user?.lastName}
                      />
                      <div className="meta d-sm-flex justify-content-sm-between align-items-center">
                        <div className="authors d-flex align-content-center">
                          <h6 className="name mb0" style={{wordBreak: "keep-all", width: "100%"}}>{user?.firstName} {user?.lastName}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">
              <Moment format="D MMM YYYY">
                {user?.createdAt}
              </Moment>
            </td>
            <td className="vam">
              {user.email}
            </td>
            <td className="vam">
              <span className={getRoleStyle(user?.role)}>
                {user?.role}
              </span>
            </td>
            <td className="vam">
              <span className={getProviderStyle(user?.provider)}>
                {user?.provider}
              </span>
            </td>
            <td className="vam">
              <div className="d-flex">
                <Link href={`/dashboard/user/${user._id}`}> 
                  <button
                    className="icon btn btn-primary p-1"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${user?._id}`}
                  >
                    <span className="fas fa-pen fa" style={{color: "green"}} />
                  </button>
                </Link>
                <ReactTooltip
                    id={`edit-${user?._id}`}
                    place="top"
                    content="Edit"
                  />
                

                <DeleteUser user={user} setDeleteData={setDeleteData}/>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
