"use client"
import "@/components/common/quillEditorTextStyle.css";

import { useLayoutEffect, useRef, useState } from "react";
import StringToDomComponent from "./StringToDomComponent";

const ReadMore = ({desc}) => {
  const [readMore, setReadMore] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("50px");

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(readMore ? `${contentRef.current.scrollHeight}px` : "50px");
    }
  }, [desc, readMore]);

  return (
    <div className="quillEditorTextHandler">
      <div
        style={{
          height: contentHeight,
          overflow: "hidden",
          transition: "height 0.6s ease-in-out",
        }}
      >
        <div ref={contentRef}>
          <StringToDomComponent htmlString={desc} />
        </div>
      </div>
      <span
        className="text-danger cursor fs-6"
        onClick={() => setReadMore((isReadMore) => !isReadMore)}
      >
        {readMore ? "Read Less" : "...Read More"}
      </span>
    </div>
  );
}

export default ReadMore;