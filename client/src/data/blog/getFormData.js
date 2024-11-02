const getFormData = (blog, e) => {

  const {title, active, desc, catagoryId, subcatagoryId, uploadedImage, uploadedImageChanged, oldImgUrl, metaTitle, metaDesc, blogId} = blog;

  const formData = new FormData(e.target);
  formData.set("title", title);
  formData.set("metaTitle", metaTitle);
  formData.set("metaDesc", metaDesc);
  formData.set("active", active);
  formData.set("uploadedImageChanged", uploadedImageChanged);
  formData.set("oldImgUrl", oldImgUrl);
  formData.set("uploadedImage", uploadedImage);
  formData.set("desc", desc);
  formData.set("blogId", blogId);

  catagoryId.forEach(type => formData.append("catagoryId[]", type._id));
  subcatagoryId.forEach(type => formData.append("subcatagoryId[]", type._id));

  return formData;
}

module.exports = getFormData;