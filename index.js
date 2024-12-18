const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import cors
const app = express();
const PORT = process.env.PORT || 4000;
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary").v2;

// Connect to the database
connectDatabase();

// Enable CORS for all routes
app.use(cors({
   
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })); 

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
// Apply JSON parsing to incoming requests
app.use(express.json());

// Routes
app.use("/api/v1/", require("./routes/propertyRoutes"));
app.use("/api/v1/", require("./routes/uploadRoutes"));


// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
});

