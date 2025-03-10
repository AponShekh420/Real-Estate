const BlogModel = require("../../models/BlogModel");
const CatagoryModel = require("../../models/CatagoryModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");

const updateBlog = async (req, res) => {

  try {
    // send these data from front-end to add a blog in database
    const {title, metaTitle, metaDesc, metaSlug, desc, catagoryId, img, active, auther, blogId, oldImgUrl, uploadedImageChanged, uploadedImage} = req.body

    // Find the current blog by ID
    const currentBlog = await BlogModel.findById(blogId);
    if (!currentBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    let slug;
    // If the title hasn't changed, keep the current slug
    if (title === currentBlog.title && currentBlog.slug == metaSlug) {
      slug = currentBlog.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = metaSlug ? metaSlug.toLowerCase().trim().replace(/[^\w\s-]/g, '') : title.toLowerCase().trim().replace(/[^\w\s-]/g, '');
      slug = sanitizedTitle.split(' ').join('-');

      // Check for duplicates excluding the current blog ID
      const duplicateBlogCount = await BlogModel.countDocuments({ slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: 'i' }, _id: { $ne: blogId } });

      if (duplicateBlogCount > 0) {
        slug = `${slug}-${duplicateBlogCount}`;
      }
    }


    const catagoriesIdArray = catagoryId?.length > 0 ? catagoryId : [process.env.uncategorizedId];

    // upload the community in database
    const blog = await BlogModel.findByIdAndUpdate(blogId, {
      title,
      slug,
      desc,
      catagory: catagoriesIdArray,
      img: (uploadedImageChanged && uploadedImage) ? req?.files[0]?.location : uploadedImageChanged ? "" : oldImgUrl,
      active,
      metaTitle,
      metaDesc,
    }).populate("catagory");


    if(JSON.parse(uploadedImageChanged) && oldImgUrl) {
      await deleteFileFromSpace('assets-upload', oldImgUrl);
    }

    if(blog) {

      // Handle category changes
      if (currentBlog?.catagory?.toString() !== catagoriesIdArray?.toString()) {
        // Pull the blog from old categories
        await CatagoryModel.updateMany(
          { _id: { $in: currentBlog.catagory } },
          { $pull: { blogs: currentBlog._id } }
        );

        // Push the blog into new categories
        await CatagoryModel.updateMany(
          { _id: { $in: catagoriesIdArray } },
          { $push: { blogs: blog._id } }
        );
      }

      // if everything is perfect then would get response
      res.status(200).json({
        msg: "The blog has updated Successfully"
      })
      
    } else {
      // the community has updated, but the community field has not updated from cityModel, stateModel or areaModel, that's why we should delete the community and to send the server side error 
      await BlogModel.findByIdAndUpdate(blog._id, blog);
      res.status(500).json({
        errors: {
          server: {
            msg: "The blog hasn't updated for server side error"
          }
        }
      });
    }

  } catch(err) {
    console.log(err.message)
  }
}

module.exports = updateBlog;