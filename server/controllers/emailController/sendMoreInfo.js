const sendEmailToAdmin = require("../../utils/sendEmailToAdmin");

const sendMoreInfo = async (req, res) => {
  const {email, name, phone, message, communityTitle, communityUrl, receiveInformation, subscribe} = req.body;
  // Create the email template function
  const getMoreInfoTemplate = (name, phone, email, message, communityTitle, communityUrl, receiveInformation, subscribe) => `
  <h1>New More Information Request</h1>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>
  <p><strong>Receive information:</strong> ${receiveInformation ? "Yes" : "No"}</p>
  <p><strong>Message:</strong> ${message}</p>
  <p><strong>Community:</strong> <a href="${process.env.CLIENT_URL}/community/${communityUrl}">${communityTitle}</a></p>
  <p>Thank you</p>
  `;

  const emailHtml = getMoreInfoTemplate(name, phone, email, message, communityTitle, communityUrl, receiveInformation, subscribe);


  try {
    await sendEmailToAdmin({
      email: email,
      subject: `Request for More Information - Community Inquiry`,
      message: emailHtml,
    })

    res.status(200).json({
      msg: "Thank you for your inquiry! We will provide you with more information soon.",
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

module.exports = sendMoreInfo;