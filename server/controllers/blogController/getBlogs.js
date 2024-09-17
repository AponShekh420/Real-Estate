const BlogModel = require("../../models/BlogModel")

const getBlogs = async (req, res) => {

  const {searchParams, active, limitEnd, limitStart} = req.body;

  const queryObjConfig = {active};

  req?.user?.role !== "admin" ? queryObjConfig.auther = req.user._id : null;

  try {
    const getBlogsData = await BlogModel.find(queryObjConfig).sort({ createdAt: -1 }).populate('catagory').populate("subcatagory").populate({
        path: 'auther',
        select: '-password',  // Exclude the password field
      });

     // Filter the results based on the populated fields
     const filteredCommunities = getBlogsData.filter(blog => {

      const categoryMatch = blog.catagory?.some(c =>
        c.name.match(new RegExp(searchParams, "i"))
      );

      const subcategoryMatch = blog.subcatagory?.some(sc =>
        sc.name.match(new RegExp(searchParams, "i"))
      );


      return (
        blog.title.match(new RegExp(searchParams, 'i')) ||
        categoryMatch ||
        subcategoryMatch ||
        blog.auther?.email.match(new RegExp(searchParams, 'i')) ||
        blog.auther?.role.match(new RegExp(searchParams, 'i')) ||
        blog.auther?.firstName.match(new RegExp(searchParams, 'i')) ||
        blog.auther?.lastName.match(new RegExp(searchParams, 'i'))
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