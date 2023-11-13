const express = require("express")
const userController = require("../controllers/user-controller")
const verifyToken = require("../middlewares/verify-token")

const router = express.Router();

router.get("/users", verifyToken, userController.getUsers);
router.post("/users", userController.registration);
router.post('/login', userController.login);
router.get('/token', userController.refreshToken);
router.delete('/logout', userController.logout);

module.exports = router
