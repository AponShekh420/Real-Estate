const sendEmailToAdmin = require("../../utils/sendEmailToAdmin");

const contactForm = async (req, res) => {
  const {email, name, phone, message} = req.body;
  // Create the email template function
  const getMoreInfoTemplate = (name, phone, email, message) => `
  <h1>New Contact Form Submission</h1>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || ""}</p>
  <p><strong>Message:</strong> ${message}</p>
  `;

  const emailHtml = getMoreInfoTemplate(name, phone, email, message);


  try {
    await sendEmailToAdmin({
      email: email,
      subject: `Contact Form Submission`,
      message: emailHtml,
    })

    res.status(200).json({
      msg: "Thank you for reaching out! We will get back to you as soon as possible.",
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

module.exports = contactForm;