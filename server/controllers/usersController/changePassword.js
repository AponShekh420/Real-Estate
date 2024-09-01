const UserModel = require("../../models/UserModel");
const bcrypt = require('bcryptjs');



const changePassword = async (req, res) => {
    const {oldPassword, password} = req.body;
    
    try {
      const user = await UserModel.findOne({email: req?.user?.email});
      if(user?.provider == "local") {
          const compare = await bcrypt.compare(oldPassword, user.password);
          if(compare) {
            const hashPassword = bcrypt.hashSync(password, 10);
            user.password = hashPassword,
            await user.save();

            // logout the social login
            req.logout(err => {
                if (err) {
                    console.log(err)
                }
            })

            // logout the local login
            res.clearCookie("session");
            
            res.status(200).json({
              msg: "password has been successfully changed"
            })
              
          } else {
            res.json({
              errors: {
                oldPassword: {
                    msg: 'Invalid Password'
                }
              }
            })
          }
      } else {
        res.json({
          errors: {
            login: {
                msg: `Password change not allowed for ${user?.provider} accounts`
            }
          }
        })
      }
    } catch(err) {
      console.log(err)
    }
}   




module.exports = changePassword;