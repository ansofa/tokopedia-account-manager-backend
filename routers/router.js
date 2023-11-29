const express = require("express");
const auth = require("./auth");
const profile = require("./profile");
const upload = require("./user-picture-cloudinary");

const router = express.Router();

router.use("/auth", auth);
router.use("/services", profile);
router.use("/services/user", upload)

module.exports = router;
