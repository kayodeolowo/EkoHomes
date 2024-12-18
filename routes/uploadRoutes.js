const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");  // To check if the directory exists and create it if necessary
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// ===== Configure Multer =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");

    // Check if the 'uploads' folder exists, create it if it doesn't
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
    }

    cb(null, uploadPath); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to the file name
  },
});

const upload = multer({ storage });

// ===== Routes =====
router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
