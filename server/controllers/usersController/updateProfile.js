const path = require("path");
const {unlink} = require('fs');
const UserModel = require("../../models/UserModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");

// upload the user on database
const updateProfile = async (req, res)=> {
  try {
    const {id, role, firstName, lastName, address, phone, companyName, about, taxNumber, oldImgUrl, uploadedImageChanged, uploadedImage} = req.body;

    const queryObj = {};

    const currentDataObj = {
      firstName,
      lastName,
      address,
      phone,
      companyName,
      about,
      taxNumber,
      avatar: (uploadedImageChanged && uploadedImage) ? req?.files[0]?.location : uploadedImageChanged ? "/images/user_avatar.png" : oldImgUrl,
    }


    if(req?.user?.role == "admin" && id) {
      queryObj._id = id;
      currentDataObj.role = role
    } else {
      queryObj.email = req?.user?.email
    }

    const user = await UserModel.findOneAndUpdate(queryObj, currentDataObj, { new: true, select: '-password' })



    if(uploadedImageChanged) {
      if(oldImgUrl && oldImgUrl?.split("/")[2] !== "lh3.googleusercontent.com" && oldImgUrl !== "/images/user_avatar.png") {
        await deleteFileFromSpace('assets-upload', oldImgUrl);
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