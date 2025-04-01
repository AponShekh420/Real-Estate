const checkCommunityHealth = (req, res, next) => {
  const {
    description,
    pictureDone,
    amenities,
    homeTypes,
    minPrice,
    maxPrice,
    ageRestrictions,
    gated,
    communitySize,
    builtStart,
    builtEnd,
    airport,
    hospital,
    militaryBase,
  } = req.body;

  let healthValue = 100;
  // per field 30%
  if (description == "" || !description || description == "<p><br></p>") {
    healthValue = healthValue - 30;
  }
  if (!JSON.parse(pictureDone)) {
    healthValue = healthValue - 30;
  }
  if (JSON.parse(amenities).length <= 0) {
    healthValue = healthValue - 30;
  }

  // per field 10%
  if (!homeTypes || homeTypes?.length <= 0) {
    healthValue = healthValue - 10;
  }
  if (Number(minPrice) <= 0 && Number(maxPrice) <= 0) {
    healthValue = healthValue - 10;
  }
  if (ageRestrictions == "null") {
    healthValue = healthValue - 10;
  }
  if (gated == "null") {
    healthValue = healthValue - 10;
  }
  if (Number(communitySize) <= 0) {
    healthValue = healthValue - 10;
  }
  if ((!builtStart && !builtEnd) || (builtEnd && !builtStart)) {
    healthValue = healthValue - 10;
  }

  // per field 1%
  if (!JSON.parse(airport).name && !JSON.parse(airport).distance) {
    healthValue = healthValue - 1;
  }
  if (!JSON.parse(hospital).name && !JSON.parse(hospital).distance) {
    healthValue = healthValue - 1;
  }

  if (!JSON.parse(militaryBase).name && !JSON.parse(militaryBase).distance) {
    healthValue = healthValue - 1;
  }

  if (healthValue <= 0) {
    healthValue = 0;
  }

  req.healthValue = healthValue;
  next();
};

module.exports = { checkCommunityHealth };
