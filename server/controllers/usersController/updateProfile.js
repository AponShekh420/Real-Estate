const path = require("path");
const {unlink} = require('fs');
const UserModel = require("../../models/UserModel");

// upload the user on database
const updateProfile = async (req, res)=> {
  try {
    const {firstName, lastName, address, phone, companyName, about, taxNumber, oldImgUrl, uploadedImageChanged, uploadedImage} = req.body;

    const user = await UserModel.findOneAndUpdate({email: req?.user?.email}, {
      firstName,
      lastName,
      address,
      phone,
      companyName,
      about,
      taxNumber,
      avatar: (uploadedImageChanged && uploadedImage) ? req?.files[0]?.filename : uploadedImageChanged ? "user_avatar.png" : oldImgUrl,
    }, { new: true, select: '-password' })



    if(uploadedImageChanged) {
      if(oldImgUrl && oldImgUrl?.split("/")[2] !== "lh3.googleusercontent.com" && oldImgUrl !== "user_avatar.png") {
        unlink(path.join(__dirname, `../../public/assets/users/${oldImgUrl}`), (err)=> {
          if(err) {
              console.log(err)
          }
        });
      }
    }

    if(user) {
      res.status(200).json({
        msg: "The Profile Has Updated Successfully",
        user: user
      })
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "The Profile hasn't updated, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}


module.exports = updateProfile;