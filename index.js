const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import cors
const app = express();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/database');

// Connect to the database
connectDatabase();

// Enable CORS for all routes
app.use(cors()); 

// Apply JSON parsing to incoming requests
app.use(express.json());

// Routes
app.use("/ekohomes/api/v1/", require("./routes/propertyRoutes"));


// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
