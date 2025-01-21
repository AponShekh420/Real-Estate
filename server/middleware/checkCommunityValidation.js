const { check } = require("express-validator");

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
    .isLength({ min: 1 })
    .withMessage("Must be select a state")
    .trim(),
  // check("cityId")
  //   .isLength({min: 1})
  //   .withMessage("Must be select a city")
  //   .trim(),
  check("areaId")
    .isLength({ min: 1 })
    .withMessage("Must be select a area")
    .trim(),

  check("communitySize")
    .isLength({ min: 1 })
    .withMessage("Must be a number of community size")
    .trim(),
  check("imgs")
    .custom((item) => item.length > 0)
    .withMessage("Must be upload a Image")
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
