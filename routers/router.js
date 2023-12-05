const express = require("express");
const user = require("./auth");
const profile = require("./profile");
const upload = require("./user-picture-cloudinary");
const userUpdate = require("./user-update");

const router = express.Router();

router.use("/auth", user);
router.use("/settings", userUpdate);
router.use("/services", profile);
router.use("/services/user", upload)
router.use('/', (req, res) => {
    res.status(404).json({
        status: "FAILED",
        message : "Not Found"
    });
});

module.exports = router;
