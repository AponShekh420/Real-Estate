const nodemailer = require("nodemailer")

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: "Apon Shekh <aponhasanurjaman9@gmail.com@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.message,
    //text:
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;