import React from "react";
import SearchBox from "./SearchBox";
import CatagoriesList from "./CatagoriesList";

const BlogSidebar = () => {
  return (
    <div className="blog-sidebar">
      <SearchBox />
      <CatagoriesList />
    </div>
  );
};

export default BlogSidebar;
