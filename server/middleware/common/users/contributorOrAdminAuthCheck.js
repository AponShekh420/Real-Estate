const contributorOrAdminAuthCheck = async (req, res, next) => {
    const {role} = req?.user;
    if(role == "admin" || role == "contributor") {
      next();
    } else {
      res.json({
        errors: {
            login: {
                msg: "Authentication Problem"
            }
        }
      })
    }
}


module.exports = contributorOrAdminAuthCheck;