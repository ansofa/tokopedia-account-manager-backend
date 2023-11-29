const express = require('express');
const uploader = require('../middlewares/uploader-image');
const uploadCloudinary = require('../libs/upload-cloudinary');
const upload = express.Router()

upload.post('/setting', uploader.single('file'), async (req, res) => {
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
})


module.exports = upload;