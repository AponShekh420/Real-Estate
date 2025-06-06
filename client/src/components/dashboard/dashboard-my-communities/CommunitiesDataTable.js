"use client";
import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
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

const CommunitiesDataTable = ({ communitiesData, setDeleteData }) => {
  const { data } = communitiesData;

  const isEditedCheck = (createdAt, updatedAt) => {
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);
    const isEdited =
      createdAtDate.getTime() > updatedAtDate.getTime() ? false : true;
    return isEdited;
  };

  const bgLayerColor = (health) => {
    if (health >= 90) {
      return "#C5DEB6";
    } else if (health >= 70) {
      return "#FFF3A8";
    } else {
      return "#F8CBAC";
    }
  };
  const progressLayerColor = (health) => {
    if (health >= 90) {
      return "#6FB143";
    } else if (health >= 70) {
      return "#ffdc17";
    } else {
      return "#FF0000";
    }
  };
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Community</th>
          <th scope="col">Added</th>
          <th scope="col">Edited</th>
          <th scope="col">Data Health</th>
          <th scope="col">Status</th>
          <th scope="col">Contact</th>
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
                    src={
                      community?.thumbnail ||
                      community?.imgs[community?.imgs?.length - 1]
                    }
                    alt="community"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/community/${community?.slug}`}>
                      {community?.title}
                    </Link>
                  </div>
                  <p className="list-text mb-0 text-capitalize">
                    {community?.city
                      ? `${community?.city?.name} City, `
                      : `${community?.area ? community?.area?.name + ", " : ""}`}
                    {community?.state?.abbreviation}
                  </p>
                  {community.minPrice || community.maxPrice ? (
                    <div className="list-price">
                      <span>
                        Price: <CommunityMinMaxPrice data={community} />
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </th>
            <td className="vam">
              <Moment format="D MMM YYYY">{community?.createdAt}</Moment>
              <p className="text-capitalize">{`${community?.createdby?.firstName}  ${community?.createdby?.lastName}`}</p>
            </td>
            <td className="vam">
              {isEditedCheck(community?.createdAt, community?.updatedAt) &&
              community?.updatedby ? (
                <div>
                  <Moment format="D MMM YYYY">{community?.updatedAt}</Moment>
                  <p className="text-capitalize">{`${community?.updatedby?.firstName}  ${community?.updatedby?.lastName}`}</p>{" "}
                </div>
              ) : (
                <p></p>
              )}
            </td>
            <td className="vam">
              <div
                style={{
                  backgroundColor: bgLayerColor(community?.health),
                  height: 28,
                  padding: 0,
                  minWidth: "10rem",
                  position: "relative",
                }}
              >
                {community?.health <= 0 ? (
                  <span
                    style={{ paddingLeft: 10 }}
                    className="d-flex align-items-center h-100 "
                  >
                    0%
                  </span>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      padding: "0 15px",
                      width:
                        community?.health > 4
                          ? community?.health + "%"
                          : 7 + "%",
                      height: "100%",
                      backgroundColor: progressLayerColor(community?.health),
                    }}
                  >
                    <span className="d-flex justify-content-center align-items-center h-100 text-white">
                      {community?.health}%
                    </span>
                  </div>
                )}
              </div>
            </td>
            <td className="vam">
              <span className={getStatusStyle(community?.active)}>
                {community?.active ? "Active" : "panding"}
              </span>
            </td>
            <td className="vam ">
              {community?.name || community?.telephone || community?.email ? (
                <div>
                  <p>{community?.name}</p>
                  <p>{community?.telephone}</p>
                  <p>{community?.email}</p>
                </div>
              ) : (
                <p></p>
              )}
            </td>
            <td className="vam">
              <div className="d-flex">
                <Link href={`/dashboard/edit-community/${community?.slug}`}>
                  <button
                    className="icon btn btn-primary p-1"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${community?.slug}`}
                  >
                    <span
                      className="fas fa-pen fa"
                      style={{ color: "green" }}
                    />
                  </button>
                </Link>
                <ReactTooltip
                  id={`edit-${community?.slug}`}
                  place="top"
                  content="Edit"
                />

                <DeleteCommunity
                  community={community}
                  setDeleteData={setDeleteData}
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
