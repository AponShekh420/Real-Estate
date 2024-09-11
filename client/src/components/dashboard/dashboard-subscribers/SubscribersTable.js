"use client";
import React from "react";
import Moment from "react-moment";
import DeleteSubscriber from "./DeleteSubscriber";



const getRoleStyle = (role) => {
  switch (role) {
    case "viewer":
      return "pending-style style3";
    default:
      return "";
  }
};


const SubscribersTable = ({subscribersData, setDeleteData}) => {
  const {data} = subscribersData;

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th scope="col">role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {data?.map((subscriber, index) => (
          <tr key={index}>
            <td className="vam">
              {subscriber.email}
            </td>
            <td className="vam">
              <Moment format="D MMM YYYY">
                {subscriber?.createdAt}
              </Moment>
            </td>
            <td className="vam">
              <span className={getRoleStyle("viewer")}>
                Subscriber
              </span>
            </td>
            <td className="vam">
              <div className="d-flex">
                <DeleteSubscriber subscriber={subscriber} setDeleteData={setDeleteData}/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubscribersTable;
