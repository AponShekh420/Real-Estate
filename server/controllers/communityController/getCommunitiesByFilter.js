// import the model of community for query the all community by filter
const CommunityModel = require("../../models/CommunityModel");
const BuilderModel = require("../../models/BuildersModel");
// This controller will give us communities data by filter
const getCommunitiesByFilter = async (req, res) => {
  const {
    stateId,
    cityId,
    areaId,
    homeTypes,
    titleSearch,
    active,
    limitStart,
    limitEnd,
    amenities,
    gated,
    price,
    ageRestrictions,
    sorting,
    isNewContraction,
    closestHospital,
    closestAirport,
    closestMilitaryBase,
    builder,
  } = req.body;

  // filter start
  const dataQueryObj = {};
  stateId ? (dataQueryObj.state = stateId) : null;
  cityId ? (dataQueryObj.city = cityId) : null;
  areaId ? (dataQueryObj.area = areaId) : null;
  titleSearch
    ? (dataQueryObj.title = { $regex: titleSearch || "", $options: "i" })
    : null;
  homeTypes?.length > 0 ? (dataQueryObj.homeTypes = { $in: homeTypes }) : null;
  amenities?.length > 0
    ? (dataQueryObj.amenities = {
        $in: amenities.map((amenity) => amenity._id),
      })
    : null;

  price ? (dataQueryObj.minPrice = { $gte: price[0], $lte: price[1] }) : null;
  price ? (dataQueryObj.maxPrice = { $gte: price[0], $lte: price[1] }) : null;

  //closest section
  if (closestHospital) {
    dataQueryObj["hospital.distance"] = { $lte: closestHospital };
  }
  if (closestAirport) {
    dataQueryObj["airport.distance"] = { $lte: closestAirport };
  }
  if (closestMilitaryBase) {
    dataQueryObj["militaryBase.distance"] = { $lte: closestMilitaryBase };
  }
  //constraction filter if buildend date is empty or not exist
  if (isNewContraction === "Yes") {
    dataQueryObj.$or = [
      { builtEnd: { $eq: "" } },
      { builtEnd: { $eq: "Present" } },
      { builtEnd: { $exists: false } },
    ];
  }

  //find with builder name then get the builder id
  if (builder) {
    const builderData = await BuilderModel.findOne({ name: builder }).select(
      "_id"
    );
    if (builder) {
      dataQueryObj.builders = { $in: [builderData._id] };
    } else {
      console.log("Builder not found for the selected name.");
    }
  }

  if (ageRestrictions == "No") {
    dataQueryObj.ageRestrictions = false;
  } else if (ageRestrictions == "Yes") {
    dataQueryObj.ageRestrictions = true;
  }

  if (gated == "No") {
    dataQueryObj.gated = false;
  } else if (gated == "Yes") {
    dataQueryObj.gated = true;
  }

  let sortCriteria = {};

  // Determine the sorting based on the option received from the frontend
  if (sorting === "Lowest Price") {
    sortCriteria = { minPrice: 1 }; // Ascending order
  } else if (sorting === "Highest Price") {
    sortCriteria = { maxPrice: -1 }; // Descending order
  } else {
    sortCriteria = { createdAt: -1 }; // Default case, no sorting
  }
  // filter end

  try {
    const data = await CommunityModel.find({
      ...dataQueryObj,
      active,
    })
      .sort(sortCriteria)
      .skip(limitStart)
      .limit(limitEnd);

    if (data) {
      res.status(200).json({
        msg: "The data has been received successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "No data found",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getCommunitiesByFilter;
