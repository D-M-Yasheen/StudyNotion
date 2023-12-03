const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, width, quality) => {
    try {
        let options = { folder };
        if (height) options.height = height;
        if (width) options.width = width;
        if (quality) options.quality = quality;
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        // console.log(error.message)
    }
}