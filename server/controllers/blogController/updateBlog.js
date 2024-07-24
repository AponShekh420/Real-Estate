const BlogModel = require("../../models/BlogModel");
const CatagoryModel = require("../../models/CatagoryModel");
const SubcatagoryModel = require("../../models/SubcatagoryModel");

const updateCommuity = async (req, res) => {

  try {
    // send these data from front-end to add a blog in database
    const {title, metaTitle, metaDesc, desc, catagoryId, subcatagoryId, img, active, auther, blogId} = req.body

    console.log(blogId);
    // slug making
    const duplicateBlog = await BlogModel.find({title: title, _id: {$ne: blogId}});
    const currentBlog = await BlogModel.findById(blogId);

    let slug;
    if(title === currentBlog.title) {
      slug = currentBlog.slug
    } else {
      if(duplicateBlog.length > 0){
        slug = title.toLowerCase().trim().split(' ').join("-") + "-" + duplicateBlog.length;
      } else {
        slug = title.toLowerCase().trim().split(' ').join("-");
      }
    }


    console.log(currentBlog.state)

    // upload the community in database
    const blog = await BlogModel.findByIdAndUpdate(blogId, {
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
    }).populate("catagory").populate("subcatagory");

    console.log(blog);


    // check: the community has upload in database or not
    if(blog) {

      // if the new state, area, city are not same with oldCommunity data then we should remove these from our community field of state, area, city
      if(currentBlog.catagory != catagoryId) {
        // pull the community in state community list
        await CatagoryModel.findByIdAndUpdate(currentBlog.catagory, {
          $pull: {
            blogs: currentBlog._id
          }
        });

        // push the community in new state community list
        const catagoryUpdate = await CatagoryModel.findByIdAndUpdate(catagoryId, {
          $push: {
            blogs: blog._id
          }
        })
      }

      // check the city
      if(currentBlog.subcatagory != subcatagoryId) {
        // pull the community in city community list
        await SubcatagoryModel.findByIdAndUpdate(currentBlog.subcatagory, {
          $pull: {
            blogs: currentBlog._id
          }
        });

        // push the community in new city community list
        const subcatagoryUpdate = await SubcatagoryModel.findByIdAndUpdate(subcatagoryId, {
          $push: {
            blogs: blog._id
          }
        })
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

module.exports = updateCommuity;