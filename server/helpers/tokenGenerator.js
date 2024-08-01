const jwt = require('jsonwebtoken');


const tokenGenerator = (res, data) => {
  const token = jwt.sign({id: data._id, email: data.email, firstName: data.firstName, lastName: data.lastName, avatar: data.avatar, role: data.role, provider: data.provider, accountId: data.accountId}, process.env.TOKEN_SECRET, {
    expiresIn: '365d',
  });

  res.cookie('token', token, {
      signed: true,
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000 // one year
  })

  return token;
}


module.exports = tokenGenerator;