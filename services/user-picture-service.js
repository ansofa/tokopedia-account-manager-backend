const fs = require('fs');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

class UserPictureService {

    async uploadCloudinary(filePath) {
        let result;
        try {
            result = await cloudinary.uploader.upload(filePath, {
                use_filename: true
            });
    
            fs.unlinkSync(filePath);
            return result;
        } catch (error) {
            fs.unlinkSync(filePath);
            throw error;
        }
    }
}

module.exports = UserPictureService