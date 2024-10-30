"use client"
import React from "react";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "Total Free Customer Care",
      phone: "800.888.3754",
      phoneHref: "tel:800.888.3754", // Updated phoneHref to use "tel" URI
    },
    {
      id: 2,
      title: "Need Live Support?",
      email: "hi@homez.com",
      emailHref: "mailto:hi@homez.com", // Updated emailHref to use "mailto" URI
    },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color d-flex gap-1 align-items-center">
                <i className="fa-light fa-phone" style={{fontSize: "14px", fontWeight: "600"}}></i>
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {/* {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )} */}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
