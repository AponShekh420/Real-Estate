"use client"
import React, { useEffect } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";



const Social = () => {
  const currentUrl = window.location.href
 
  return (
    <>
      <FacebookShareButton url={currentUrl}>
        <span className="me-3">
          <i className="fab fa-facebook-f" />
        </span>
      </FacebookShareButton>
      <LinkedinShareButton url={currentUrl}>
        <span className="me-3">
          <i className="fab fa-linkedin-in" />
        </span>
      </LinkedinShareButton>
      <TwitterShareButton url={currentUrl}>
        <span className="me-3">
          <i className="fab fa-twitter" />
        </span>
      </TwitterShareButton>
    </>
  );
};

export default Social;
