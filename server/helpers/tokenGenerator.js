const jwt = require('jsonwebtoken');


const tokenGenerator = (res, data) => {
  const token = jwt.sign({id: data._id, email: data.email, firstName: data.firstName, lastName: data.lastName, avatar: data.avatar, role: data.role, provider: data.provider, accountId: data.accountId}, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('session', token, {
      // signed: true,
      httpOnly: true,
      secure: process.env.SECURE_COOKIE || "production",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  })

  return token;
}


module.exports = tokenGenerator;