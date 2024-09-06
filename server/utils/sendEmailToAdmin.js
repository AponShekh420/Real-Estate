const nodemailer = require("nodemailer")

const sendEmailToAdmin = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: options.email,
    to: "aponhasanurjaman9@gmail.com@gmail.com",
    subject: options.subject,
    html: options.message,
    //text:
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmailToAdmin;