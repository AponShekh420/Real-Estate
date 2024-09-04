const UserModel = require("../../models/UserModel")

const getUser = async (req, res) => {
  const {id} = req.params;
    try {
      const user = await UserModel.findById(id, '-password')
      if(user) {
        res.status(200).json({
          msg: "You got the user",
          user: user
        })
      } else {
        res.status(404).json({
          errros: {
            notFound: {
              msg: "User not found"
            }
          }
        })
      }
        
    } catch(err) {
        console.log(err)
        res.status(500).json({
          errors: {
            server: {
              msg: "Internal server error. Please try again later."
            }
          }
        });
    }
}   


module.exports = getUser;