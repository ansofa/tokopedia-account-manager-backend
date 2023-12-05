const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const UserController = require("../controllers/user-controller");
const userController = new UserController();

const auth = express.Router();

auth.get("/user", verifyToken, userController.getUser);
auth.post("/register", userController.registration);
auth.post("/login", userController.login);
auth.get("/token", userController.refreshToken);
auth.delete("/logout", userController.logout);

module.exports = auth;