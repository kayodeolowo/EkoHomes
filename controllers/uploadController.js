const cloudinary = require("cloudinary").v2;

// Upload image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    // Check if a file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads", // Optional folder to organize images in Cloudinary
    });

    // Send success response with the image URL
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed.",
      error: error.message,
    });
  }
};

module.exports = { uploadImage };
