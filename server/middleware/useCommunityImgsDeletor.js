const path = require("path");
const {unlink} = require("fs");


const useCommunityImgsDeletor = async (req, res, next) => {
    const {deleteImgUrls} = req.body;
    try {
      deleteImgUrls.forEach((eachUrl)=> {
        unlink(path.join(__dirname, `../public/assets/communityImgs/${eachUrl}`), (err)=> {
          if(err) {
              console.log(err)
          }
        })
      })
      next();
    } catch(err) {
        console.log(err);
    }
}

module.exports = useCommunityImgsDeletor;