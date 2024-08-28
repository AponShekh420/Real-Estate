const getUser = async (req, res) => {
    try {
      res.status(200).json({
        userInfo: req.user
      })
        
    } catch(err) {
        console.log(err)
    }
}   


module.exports = getUser;