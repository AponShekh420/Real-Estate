const UserModel = require("../../models/UserModel");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const {email, password, firstName, lastName } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    if(hashPassword) {
      const NewUser = new UserModel({
        firstName,
        lastName,
        password: hashPassword,
        email,
        provider: "local",
        accountId: null,
      });
      const status = await NewUser.save();
      if(status) {
        res.status(200).json({
          msg: "Registration completed successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            server: {
              msg: "A server-side error occurred. Please try again"
            }
          }
        })
      }
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "A server-side error occurred. Please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = register;