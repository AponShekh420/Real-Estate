const BlogModel = require("../../models/BlogModel")

const getBlogs = async (req, res) => {

  const {searchParams, active, limitEnd, limitStart} = req.body;

  try {
    const getBlogsData = await BlogModel.find({active}).populate('catagory').populate("subcatagory").populate("auther");

     // Filter the results based on the populated fields
     const filteredCommunities = getBlogsData.filter(blog => {
      return (
        blog.title.match(new RegExp(searchParams, 'i')) ||
        blog.catagory?.name.match(new RegExp(searchParams, 'i')) ||
        blog.subcatagory?.name.match(new RegExp(searchParams, 'i')) ||
        blog.auther?.name.match(new RegExp(searchParams, 'i'))
      );
    });

    res.status(200).json({
      data: filteredCommunities.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredCommunities.length,
    })


  } catch (err) {
    console.log(err.message)
  }
}

module.exports = getBlogs;