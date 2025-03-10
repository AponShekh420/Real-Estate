const UserModel = require("../../models/UserModel")
const sendEmail = require("../../utils/sendEmail")

const forgotPassword = async (req, res) => {
  const { email } = req.body

  const user = await UserModel.findOne({ email })

  if (!user || user == null) {
    res.status(400).json({
      errors: {
        fail: {
          msg: "User Not Found"
        }
      }
    })
  } else {
    const resetToken = user.createPasswordResetToken()
    await user.save()

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`



    const socialLoginMsg = `<h2>Forgot your password?</h2>

    <p>Because this account signs in using ${user?.provider}, CompanyName does not store your password. If you still wish to reset your ${user?.provider} password you will need to visit their website to do so.</p>

    <p>If you no longer want to use your ${user?.provider} account to sign in to CompanyName, sign in to the <a href="${process.env.CLIENT_URL}/register">CompanyName Account Center</a> to disconnect it.</p>

    <p>If you're not sure why you're receiving this message, you can report it to us by emailing placeholderemail@envato.com.</p>

    <p>Thanks,</p>
    <p style="line-height:0">companyName</p>`


    const message = user.provider !== "local" ? socialLoginMsg : `<h2>Forgot Password?</h2> Click on this this link to reset your Password: <a href="${resetUrl}">${resetUrl}</a>`

    try {
      await sendEmail({
        email: user.email,
        subject: "Instructions for changing your 55&Up Account password",
        message,
      })

      res.status(200).json({
        msg: "Token Sent to email!",
      })
    } catch (error) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()
      console.log(error)

      res.status(500).json({
        errors: {
          fail: {
            msg: "There was an error in sending the email. Please Try again later"
          }
        }
      })
    }
  }
}


module.exports = forgotPassword;