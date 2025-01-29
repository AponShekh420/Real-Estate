const { check } = require("express-validator");
const disposableDomains = [
  "tempmail.com",
  "mailinator.com",
  "guerrillamail.com",
];
const checkCommunityValidation = [
  check("title")
    .isLength({ min: 5 })
    .withMessage("The title is too short")
    .trim(),
  check("address")
    .isLength({ min: 3 })
    .withMessage("Must be a valid address")
    .trim(),
  check("stateId")
    .isLength({ min: 10 })
    .withMessage("State selection is required")
    .custom((value) => {
      if (value === undefined || value === null) {
        throw new Error("State cannot be empty");
      }
      return true;
    })
    .trim(),
  check("areaId")
    .isLength({ min: 10 })
    .withMessage("Area selection is required")
    .custom((value) => {
      if (value === undefined || value === null) {
        throw new Error("Area cannot be empty");
      }
      return true;
    })
    .trim(),
  check("map").isLength({ min: 1 }).withMessage("Must be a valid city").trim(),
  check("zip")
    .isLength({ min: 1 })
    .withMessage("Must be a valid zip code")
    .trim(),
  // check("cityId")
  //   .isLength({min: 1})
  //   .withMessage("Must be select a city")
  //   .trim(),

  check("communitySize")
    .isLength({ min: 1 })
    .withMessage("Must be a number of community size")
    .trim(),
  check("imgs")
    .custom((item) => item.length > 0)
    .withMessage("Must be upload a Image")
    .trim(),
  check("phone")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\(\d{3}\) \d{3} \d{4}$/)
    .withMessage("Phone number must be in the format (111) 111 1234")
    .custom((value) => {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length !== 10) {
        throw new Error("Phone number must be 10 digits long");
      }
      return true;
    })
    .trim(),
  check("telephone")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\(\d{3}\) \d{3} \d{4}$/)
    .withMessage("Phone number must be in the format (111) 111 1234")
    .custom((value) => {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length !== 10) {
        throw new Error("Phone number must be 10 digits long");
      }
      return true;
    })
    .trim(),
  check("email")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email format")
    .custom((email) => {
      const domain = email.split("@")[1];
      if (disposableDomains.includes(domain)) {
        throw new Error("Disposable email addresses are not allowed");
      }
      return true;
    })
    .trim(),
  check("airport")
    .optional()
    .custom((value) => {
      const airport = JSON.parse(value); // Parse the airport object
      if (airport.name && !airport.distance) {
        throw new Error("Distance is required if name is provided");
      }
      if (airport.distance && typeof airport.distance !== "number") {
        throw new Error("Distance must be a number");
      }
      return true;
    })
    .withMessage("Airport distance is required"),
  check("hospital")
    .optional()
    .custom((value) => {
      const hospital = JSON.parse(value); // Parse the airport object
      if (hospital.name && !hospital.distance) {
        throw new Error("Distance is required if name is provided");
      }
      if (hospital.distance && typeof hospital.distance !== "number") {
        throw new Error("Distance must be a number");
      }
      return true;
    })
    .withMessage("Hospital distance is required"),
  check("militaryBase")
    .optional()
    .custom((value) => {
      const militaryBase = JSON.parse(value); // Parse the airport object
      if (militaryBase.name && !militaryBase.distance) {
        throw new Error("Distance is required if name is provided");
      }
      if (militaryBase.distance && typeof militaryBase.distance !== "number") {
        throw new Error("Distance must be a number");
      }
      return true;
    })
    .withMessage("Military base distance is required"),
];

module.exports = checkCommunityValidation;
