const UserModel = require("../../models/UserModel");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (user) {
      res.status(200).json({
        msg: "User has been successfully deleted."
      });
    } else {
      res.status(404).json({
        errors: {
          server: {
            msg: "User not found or deletion failed. Please try again."
          }
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: {
        server: {
          msg: "Internal server error. Please try again later."
        }
      }
    });
  }
};

module.exports = deleteUser;
