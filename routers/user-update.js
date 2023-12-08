const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const UserUpdateController = require("../controllers/user-update-controller");
const userUpdateController = new UserUpdateController();

const userUpdate = express.Router();

userUpdate.post("/image", verifyToken, userUpdateController.updateImage);

module.exports = userUpdate;