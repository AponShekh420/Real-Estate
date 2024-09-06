const sendEmailToAdmin = require("../../utils/sendEmailToAdmin");

const sendSchedule = async (req, res) => {
  const {email, name, phone, time, message, communityTitle, communityUrl} = req.body;
  // Create the email template function
  const getScheduleTemplate = (name, phone, email, message, time, communityTitle, communityUrl) => `
  <h1>New Schedule Request</h1>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Time:</strong> ${time}</p>
  <p><strong>Message:</strong> ${message}</p>
  <p><strong>Community:</strong> <a href="${process.env.CLIENT_URL}/community/${communityUrl}">${communityTitle}</a></p>
  <p>Thank you</p>
  `;

  const emailHtml = getScheduleTemplate(name, phone, email, message, time, communityTitle, communityUrl);


  try {
    await sendEmailToAdmin({
      email: email,
      subject: `Community Tour Request - Schedule Visit`,
      message: emailHtml,
    })

    res.status(200).json({
      msg: "Thank you for your request!",
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      errors: {
        fail: {
          msg: "There was an error in sending the request. Please Try again later"
        }
      }
    })
  }
}

module.exports = sendSchedule;