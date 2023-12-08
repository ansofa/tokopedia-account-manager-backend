const UserPictureService = require("../services/user-picture-service");
const userPictureService = new UserPictureService();

class UserPictureController {
    async storeProfilePicture(req, res) {
        try {
            const { url } = await userPictureService.uploadCloudinary(req.file.path);
            res.status(200).json({ status: "SUCCESS", message: "Upload Berhasil", url:url });
            
        } catch (error) {
            if (error.message == "Cannot read properties of undefined (reading 'path')")
              res.status(400).json({ status: "FAILED", message: "Gambar belum disertakan" });
            else
              res.status(500).json({ status: "FAILED", message: "Internal Server Error" });
        }
    }
}

module.exports = UserPictureController