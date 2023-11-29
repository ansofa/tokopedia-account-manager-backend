const uploadCloudinary = require("../libs/upload-cloudinary");

class UserPictureController {
    async storeProfilePicture(req, res) {
        try {
            const { url } = await uploadCloudinary(req.file.path);

            if (url) {
                res.status(200).json({
                    status: "SUCCESS",
                    message: "Upload Berhasil",
                    url: url
                })
            } else {
                res.status(400).json({
                    message: "Upload Berhasil",
                    url: null
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserPictureController