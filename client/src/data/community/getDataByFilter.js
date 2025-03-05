const getDataByFilter = (community) => {
  const {
    title,
    website,
    phone,
    address,
    map,
    sqft,
    active,
    status,
    imgs,
    builtEnd,
    builtStart,
    gated,
    ageRestrictions,
    communitySize,
    homeTypes,
    maxPrice,
    minPrice,
    zip,
    county,
    embedVideo,
    areaId,
    cityId,
    stateId,
    description,
    amenities,
    builders,
    thumbnail,
    communityId,
    existingImages,
    deletedImages,
    newImages,
    metaTitle,
    metaDesc,
    metaSlug,
    createdby,
    updatedby,
    //contact not required
    name,
    telephone,
    email,
    notes,
    //closest section
    airport,
    hospital,
    militaryBase,
    pictureDone,
  } = community;

  const formData = new FormData();
  formData.set("title", title);
  formData.set("metaTitle", metaTitle);
  formData.set("metaDesc", metaDesc);
  formData.set("metaSlug", metaSlug);
  formData.set("website", website);
  formData.set("phone", phone);
  formData.set("address", address);
  formData.set("map", map);
  formData.set("sqft", sqft);
  formData.set("active", active);
  formData.set("status", status);
  formData.set("imgs", imgs);
  formData.set("builtEnd", builtEnd);
  formData.set("builtStart", builtStart);

  formData.set("gated", gated);
  formData.set("ageRestrictions", ageRestrictions);
  formData.set("communitySize", communitySize);
  formData.set("maxPrice", maxPrice);
  formData.set("minPrice", minPrice);
  formData.set("zip", zip);
  formData.set("embedVideo", embedVideo);
  formData.set("county", county);
  formData.set("description", description);
  formData.set("thumbnail", thumbnail);
  formData.set("communityId", communityId);

  formData.set("areaId", areaId?._id);
  formData.set("cityId", cityId?._id);
  formData.set("stateId", stateId?._id);

  formData.set("createdby", createdby);
  formData.set("updatedby", updatedby);
  formData.set("name", name);
  formData.set("telephone", telephone);
  formData.set("email", email);
  formData.set("notes", notes);
  formData.set("pictureDone", pictureDone);
  // Append new images to FormData
  newImages?.forEach((image) => {
    formData.append("newImages", image); // Send only new images
  });

  formData.set(
    "amenities",
    JSON.stringify(amenities.map((amenity) => amenity._id))
  );
  formData.set(
    "builders",
    JSON.stringify(builders.map((builder) => builder._id))
  );

  homeTypes.forEach((type) => formData.append("homeTypes[]", type));

  formData.set("airport", JSON.stringify(airport));
  formData.set("hospital", JSON.stringify(hospital));
  formData.set("militaryBase", JSON.stringify(militaryBase));

  // Send existing images' URLs and deleted images as separate fields
  formData.append("existingImages", JSON.stringify(existingImages)); // Send remaining existing images
  formData.append("deletedImages", JSON.stringify(deletedImages)); // Send deleted images for server-side cleanup

  if (community.draftCommunityId) {
    formData.append("draftId", community.draftCommunityId);
  }
  return formData;
};

module.exports = getDataByFilter;
