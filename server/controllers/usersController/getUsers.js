const UserModel = require("../../models/UserModel")

const getUsers = async (req, res) => {

  const {searchParams, limitEnd, limitStart} = req.body;


  try {
    const users = await UserModel.find({_id: {$ne: req?.user?._id}});

     // Filter the results based on the populated fields
     const filteredUser = users.filter(user => {
      return (
        user?.email?.match(new RegExp(searchParams, 'i')) ||
        user?.firstName?.match(new RegExp(searchParams, 'i')) ||
        user?.lastName?.match(new RegExp(searchParams, 'i')) ||
        user?.role?.match(new RegExp(searchParams, 'i')) ||
        user?.provider?.match(new RegExp(searchParams, 'i')) ||
        user?.phone?.match(new RegExp(searchParams, 'i')) ||
        user?.address?.match(new RegExp(searchParams, 'i')) ||
        user?.companyName?.match(new RegExp(searchParams, 'i'))
      );
    });

    res.status(200).json({
      data: filteredUser.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredUser.length,
    })


  } catch (err) {
    console.log(err.message)
  }
}

module.exports = getUsers;