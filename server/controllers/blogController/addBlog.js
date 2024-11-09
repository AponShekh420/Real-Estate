const BlogModel = require("../../models/BlogModel");
const CatagoryModel = require("../../models/CatagoryModel");

const addBlog = async (req, res) => {

  // send these data from front-end to add a blog in database
  const {title, metaTitle, metaDesc, metaSlug, desc, catagoryId, img, active, auther, oldImgUrl, uploadedImageChanged, uploadedImage} = req.body

  try {

    // Remove special characters and make the slug
    const sanitizedTitle = metaSlug ? metaSlug.toLowerCase().trim().replace(/[^\w\s-]/g, '') : title.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    let slug = sanitizedTitle.split(' ').join('-');

    // Check for duplicates
    const duplicateBlogCount = await BlogModel.countDocuments({ slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: 'i' } });

    if (duplicateBlogCount > 0) {
      slug = `${slug}-${duplicateBlogCount}`;
    }

    const catagoriesIdArray = catagoryId?.length > 0 ? catagoryId : [process.env.uncategorizedId];


    // upload the blog in database
    const blog = await BlogModel.insertMany({
      title,
      slug,
      desc,
      catagory: catagoriesIdArray,
      img: (uploadedImageChanged && uploadedImage) ? req?.files[0]?.location : uploadedImageChanged ? "" : oldImgUrl,
      active,
      auther: req.user._id,
      metaTitle,
      metaDesc,
    });



    // check: the blog has upload in database or not
    if(blog) {

      const catagoryQueryObj = catagoryId?.length > 0 ? {$or: catagoryId?.map(eachCatagory => ({_id: eachCatagory}))} : {_id: process.env.uncategorizedId};


      // push the blog in catagory blogs list
      const catagoryUpdate = await CatagoryModel.updateMany(catagoryQueryObj, {
        $push: {
          blogs: blog[0]._id
        }
      })




      if(catagoryUpdate) {
        res.status(200).json({
          msg: "The blog has uploaded Successfully",
          data: blog[0]
        })
      } else {
        // the blog has uploaded, but the blogs field has not updated from catagory, that's why we should delete the blog and to send the server side error 
        await BlogModel.findByIdAndDelete(blog[0]._id);
        res.status(500).json({
          errors: {
            catagoryUpdate: {
              msg: "There was an server side error"
            }
          }
        })
      }
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "There was an server side error"
          }
        }
      })
    }

  } catch(err) {
    console.log(err.message)
  }
}

module.exports = addBlog;