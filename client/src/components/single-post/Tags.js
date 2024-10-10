import Link from "next/link";
import React from "react";

const tags = ["Figma", "Sketch", "HTML5"];

const Tags = () => {
  return (
    <>
      {tags.map((tag, index) => (
        <span className="mr10" key={index}>
          {tag}
        </span>
      ))}
    </>
  );
};

export default Tags;
