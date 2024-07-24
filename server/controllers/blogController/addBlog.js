const BlogModel = require("../../models/BlogModel");
const CatagoryModel = require("../../models/CatagoryModel");
const SubcatagoryModel = require("../../models/SubcatagoryModel");

const addBlog = async (req, res) => {

  // send these data from front-end to add a blog in database
  const {title, metaTitle, metaDesc, desc, catagoryId, subcatagoryId, img, active, auther} = req.body

  try {

    // slug making
    const duplicateBlog = await BlogModel.find({title});

    let slug;
    if(duplicateBlog.length > 0){
      slug = title.toLowerCase().trim().split(' ').join("-") + "-" + duplicateBlog.length;
    } else {
      slug = title.toLowerCase().trim().split(' ').join("-");
    }


    // upload the blog in database
    const blog = await BlogModel.insertMany({
      title,
      slug,
      desc,
      catagory: catagoryId || "66a0b384885b42cf193f9d63",
      subcatagory: subcatagoryId || null,
      img,
      active,
      auther,
      metaTitle,
      metaDesc,
    });

    // check: the blog has upload in database or not
    if(blog) {
      // push the blog in catagory blogs list
      const catagoryUpdate = await CatagoryModel.findByIdAndUpdate(catagoryId || "66a0b384885b42cf193f9d63", {
        $push: {
          blogs: blog[0]._id
        }
      })

      // push the blog in subcatagory blogs list
      if(subcatagoryId) {
        await SubcatagoryModel.findByIdAndUpdate(subcatagoryId, {
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