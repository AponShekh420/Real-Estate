const getFormData = (blog, e) => {

  const {title, active, desc, catagoryId, uploadedImage, uploadedImageChanged, oldImgUrl, metaTitle, metaDesc, blogId, metaSlug} = blog;

  const formData = new FormData(e.target);
  formData.set("title", title);
  formData.set("metaTitle", metaTitle);
  formData.set("metaDesc", metaDesc);
  formData.set("metaSlug", metaSlug);
  formData.set("active", active);
  formData.set("uploadedImageChanged", uploadedImageChanged);
  formData.set("oldImgUrl", oldImgUrl);
  formData.set("uploadedImage", uploadedImage);
  formData.set("desc", desc);
  formData.set("blogId", blogId);

  catagoryId.forEach(type => formData.append("catagoryId[]", type._id));

  return formData;
}

module.exports = getFormData;