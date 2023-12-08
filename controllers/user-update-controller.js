const UserUpdateService = require("../services/user-update-service");
const userUpdateService = new UserUpdateService();

class UserUpdateController{
    async updateImage(req, res) {
        try {
          await userUpdateService.updateImage(req.user_id, req.body);
          res.status(200).json({ status: "SUCCESS", message: "Update Image Berhasil"});
        } catch (error) {
          const errorMappings = {
            "Forbidden": 403,
            "Unauthorized": 401,
          };
          const statusCode = errorMappings[error.message] || 500;
          res.status(statusCode).json({ status: "FAILED", message: error.message });
        }
      }
}

module.exports = UserUpdateController