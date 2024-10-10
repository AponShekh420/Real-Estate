import Link from "next/link";
import React from "react";

const Social = () => {
  const socialIcons = [
    "fab fa-facebook-f",
    "fab fa-twitter",
    "fab fa-linkedin-in",
  ];

  return (
    <>
      {socialIcons.map((iconClass, index) => (
        <span className="mr20" key={index}>
          <i className={iconClass} />
        </span>
      ))}
    </>
  );
};

export default Social;
