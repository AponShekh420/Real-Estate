import React from "react";
import SearchBox from "./SearchBox";
import LatestPost from "./LatestPost";
import PopularTags from "./PopularTags";
import CatagoriesList from "./CatagoriesList";

const BlogSidebar = () => {
  return (
    <div className="blog-sidebar">
      <SearchBox />
      <CatagoriesList />
      <LatestPost />
      <PopularTags />
    </div>
  );
};

export default BlogSidebar;
