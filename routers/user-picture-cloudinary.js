const express = require("express");
const verifyUpload = require("../middlewares/verivy-upload");
const UserPictureController = require("../controllers/user-picture-controller");
const verifyToken = require("../middlewares/verify-token");
const userPictureController = new UserPictureController();
const upload = express.Router()

upload.post("/cloudinary", verifyToken ,verifyUpload, userPictureController.storeProfilePicture)

module.exports = upload;