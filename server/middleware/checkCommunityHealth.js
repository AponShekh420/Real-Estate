export const checkCommunityHealth = (req, res, next) => {
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

  let healthValue = 0;
  // per field 30%
  if (description) {
    healthValue = healthValue + 30;
  }
  if (JSON.parse(pictureDone)) {
    healthValue = healthValue + 30;
  }
  if (JSON.parse(amenities).length > 0) {
    healthValue = healthValue + 30;
  }
  // per field 10%

  if (homeTypes && homeTypes.length > 0) {
    healthValue = healthValue + 10;
  }
  if (Number(minPrice) > 0 && Number(maxPrice) > 0) {
    healthValue = healthValue + 10;
  }
  if (ageRestrictions && ageRestrictions !== "null") {
    healthValue = healthValue + 10;
  }
  if (gated && gated !== "null") {
    healthValue = healthValue + 10;
  }
  if (Number(communitySize) > 0) {
    healthValue = healthValue + 10;
  }
  if (builtStart && builtEnd) {
    healthValue = healthValue + 10;
  }
  // per field 1%
  if (JSON.parse(airport).name && JSON.parse(airport).distance) {
    healthValue = healthValue + 1;
  }
  if (JSON.parse(hospital).name && JSON.parse(hospital).distance) {
    healthValue = healthValue + 1;
  }

  if (JSON.parse(militaryBase).name && JSON.parse(militaryBase).distance) {
    healthValue = healthValue + 1;
  }

  if (healthValue <= 0) {
    healthValue = 0;
  } else if (healthValue >= 100) {
    healthValue = 100;
  } else {
    healthValue = healthValue;
  }

  req.healthValue = healthValue;
  next();
};
