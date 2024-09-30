import React from "react";
import SearchBox from "./SearchBox";
import PopularTags from "./PopularTags";
import CatagoriesList from "./CatagoriesList";

const BlogSidebar = () => {
  return (
    <div className="blog-sidebar">
      <SearchBox />
      <CatagoriesList />
      <PopularTags />
    </div>
  );
};

export default BlogSidebar;
