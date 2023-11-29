const express = require("express");
const ProfileController = require("../controllers/profile-controller");
const verifyToken = require("../middlewares/verify-token");
const profile = express.Router();

const profileController = new ProfileController();

// Endpoint store profile
profile.post("/tokopedia/profiles", verifyToken, profileController.storeProfile);

// Endpoint fetch profile
profile.get("/tokopedia/profiles/:profileId", verifyToken, profileController.fetchProfile);

// Endpoint delete profile
profile.delete("/tokopedia/profiles/:profileId" , verifyToken, profileController.deleteProfile);

// Endpoint get all profile
profile.get("/tokopedia/profiles" , verifyToken, profileController.getAllProfileId);

module.exports = profile;
