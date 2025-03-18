"use client";
import { useSelector } from "react-redux";

const TopTitle = ({ title }) => {
  const { state, area, city } = useSelector((state) => state.communityFilter);
  return (
    <h2 className="title text-capitalize">
      {city
        ? `${title} 55+ Communities`
        : area
        ? `${title} 55 and over Communities`
        : `Top ${title} Retirement Communities`}
    </h2>
  );
};

export default TopTitle;
