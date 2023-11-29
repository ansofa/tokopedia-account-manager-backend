const ProfileService = require("../services/profile-service");

const profileService = new ProfileService();

class ProfileController {
  async storeProfile(req, res) {
    try {
      const bearer = req.body.bearer;
      const owner_id = req.user_id;
      const store = await profileService.storeProfile(owner_id, bearer);

      res.status(201).json({ status: "SUCCESS", message: store });
    } catch (error) {
      const errorMappings = {
        "Bearer tidak valid.": 400,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async fetchProfile(req, res) {
    try {
      const profile_id = req.params.profileId;
      const owner_id = req.user_id;
      const data = await profileService.fetchProfile(owner_id, profile_id);

      res.status(200).json({ status: "SUCCESS", data });
    } catch (error) {
      const errorMappings = {
        "Profile tidak ditemukan": 400,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async getAllProfileId(req, res) {
    try {
      const owner_id = req.user_id;
      const data = await profileService.getAllProfileId(owner_id);

      res.status(200).json({ status: "SUCCESS", data });
    } catch (error) {
      const errorMappings = {
        "Profile tidak ditemukan": 400,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async deleteProfile(req, res) {
    try {
      const profile_id = req.params.profileId;
      const deleteProfile = await profileService.delete(profile_id);
      res.status(200).json({ status: "SUCCESS", message: deleteProfile });
    } catch (error) {
        const errorMappings = {
            "Profile tidak ditemukan": 400,
          };
          const statusCode = errorMappings[error.message] || 500;
          res.status(statusCode).json({ status: "FAILED", message: error.message });
        }
  }
}

module.exports = ProfileController;
