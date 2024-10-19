const getDataByFilter = (community) => {

  const {title, website, phone, address, lat, long, sqft, active, status, imgs, builtEnd, builtStart, gated, ageRestrictions, communitySize, homeTypes, maxPrice, minPrice, zip, areaId, cityId, stateId, description, amenities, thumbnail, communityId, existingImages, deletedImages, newImages, metaTitle, metaDesc} = community;

  const formData = new FormData();
  formData.set("title", title);
  formData.set("metaTitle", metaTitle);
  formData.set("metaDesc", metaDesc);
  formData.set("website", website);
  formData.set("phone", phone);
  formData.set("address", address);
  formData.set("lat", lat);
  formData.set("long", long);
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
  formData.set("description", description);
  formData.set("thumbnail", thumbnail);
  formData.set("communityId", communityId);

  formData.set("areaId", areaId?._id);
  formData.set("cityId", cityId?._id);
  formData.set("stateId", stateId?._id);


  // Append new images to FormData
  newImages?.forEach((image) => {
    formData.append('newImages', image); // Send only new images
  });


  formData.set('amenities', JSON.stringify(amenities.map(amenity => amenity._id)));


  homeTypes.forEach(type => formData.append("homeTypes[]", type));


  // Send existing images' URLs and deleted images as separate fields
  formData.append('existingImages', JSON.stringify(existingImages)); // Send remaining existing images
  formData.append('deletedImages', JSON.stringify(deletedImages)); // Send deleted images for server-side cleanup


  return formData;
}

module.exports = getDataByFilter;