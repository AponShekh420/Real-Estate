const BlogModel = require("../../models/BlogModel");
const CatagoryModel = require("../../models/CatagoryModel");
const SubcatagoryModel = require("../../models/SubcatagoryModel");

const addBlog = async (req, res) => {

  // send these data from front-end to add a blog in database
  const {title, metaTitle, metaDesc, desc, catagoryId, subcatagoryId, img, active, auther, oldImgUrl, uploadedImageChanged, uploadedImage} = req.body

  try {

    // Remove special characters and make the slug
    const sanitizedTitle = title.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    let slug = sanitizedTitle.split(' ').join('-');

    // Check for duplicates
    const duplicateBlogCount = await BlogModel.countDocuments({ slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: 'i' } });

    if (duplicateBlogCount > 0) {
      slug = `${slug}-${duplicateBlogCount}`;
    }

    const catagoriesIdArray = catagoryId.length > 0 ? catagoryId : [process.env.uncatagoryId];


    // upload the blog in database
    const blog = await BlogModel.insertMany({
      title,
      slug,
      desc,
      catagory: catagoriesIdArray,
      subcatagory: subcatagoryId || [],
      img: (uploadedImageChanged && uploadedImage) ? req?.files[0]?.location : uploadedImageChanged ? "" : oldImgUrl,
      active,
      auther: req.user._id,
      metaTitle,
      metaDesc,
    });



    // check: the blog has upload in database or not
    if(blog) {

      const catagoryQueryObj = catagoryId.length > 0 ? {$or: catagoryId.map(eachCatagory => ({_id: eachCatagory?._id}))} : {_id: process.env.uncatagoryId};

      console.log("catagoryQueryObj:", catagoryQueryObj)
      // push the blog in catagory blogs list
      const catagoryUpdate = await CatagoryModel.updateMany(catagoryQueryObj, {
        $push: {
          blogs: blog[0]._id
        }
      })




      const subcatagoryQueryObj = {$or: subcatagoryId.map(eachCatagory => ({_id: eachCatagory?._id}))};

      // push the blog in subcatagory blogs list
      if(subcatagoryId?.length > 0) {
        await SubcatagoryModel.updateMany(subcatagoryQueryObj, {
          $push: {
            blogs: blog[0]._id
          }
        })
      }

      // check: those catagoryModel and subcatagoryModel has updated or not
      if(catagoryUpdate) {
        res.status(200).json({
          msg: "The blog has uploaded Successfully",
          data: blog[0]
        })
      } else {
        // the blog has uploaded, but the blogs field has not updated from subcatagory or catagory, that's why we should delete the blog and to send the server side error 
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