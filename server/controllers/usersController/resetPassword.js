const crypto = require('crypto');
const UserModel = require("../../models/UserModel")
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../../helpers/tokenGenerator');

const resetPassword = async (req, res) => {
  const {password} = req.body


  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex")

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })


  if (!user || user == null) {
    res.status(400).json({
      errors: {
        fail: {
          msg: "Token is invalid or has expired"
        }
      }
    })
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    user.password = hashPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    tokenGenerator(res, user)

    res.status(200).json({
      userInfo: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        role: user.role,
        provider: user.provider,
        avatar: user.avatar,
        accountId: user.accountId,
      },
      // token: token,
      msg: "login sucessfully"
    })
  }
}


module.exports = resetPassword;