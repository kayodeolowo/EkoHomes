const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Property = require("../models/propertiesModels")

const {paginate, search} = require("../utils/paginate")





// Create a property
const createProperties = asyncHandler(async (req, res) => {
  const { 
    property_name, 
    address, 
    price, 
    property_type, 
    image 
  } = req.body;

  // Array to collect missing fields
  let missingFields = [];

  if (!property_name) missingFields.push("property_name");
  if (!address) missingFields.push("address");
  if (!price) missingFields.push("price");
  if (!property_type) missingFields.push("property_type");

  // Check for missing fields
  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`The following fields are required: ${missingFields.join(", ")}`);
  }

  // Create a new property
  const property = await Property.create({
    property_name,
    address,
    price,
    property_type,
    image: image || "https://via.placeholder.com/150", // Default image if none is provided
  });

  res.status(201).json({
    status: "success",
    message: "Property created successfully",
    data: property,
  });
});

const getProperties = asyncHandler(async (req, res) => {
  // Extract query parameters
  let { page = 1, pageSize = 10, search: searchTerm = "", propertyType } = req.query;

  // Fetch all properties
  const allProperties = await Property.find()
    .select("-__v") // Exclude version key
    .sort({ createdAt: -1 }); // Sort by latest created

  // Filter by propertyType if provided
  const filteredProperties = propertyType
    ? allProperties.filter((property) => property.property_type === propertyType)
    : allProperties;

  // Apply search (by property_name and address)
  const searchedProperties = search(filteredProperties, searchTerm, [
    "property_name",
    "address",
  ]);

  // Apply pagination
  const paginatedProperties = paginate(searchedProperties, page, pageSize);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Properties fetched successfully",
    data: {
      properties: paginatedProperties.data,
      totalItems: paginatedProperties.totalItems,
      totalPages: paginatedProperties.totalPages,
      currentPage: paginatedProperties.currentPage,
    },
  });
});


const getPropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Get the property ID from the route parameter

  // Find the property by ID
  const property = await Property.findById(id);

  // If the property is not found, return a 404 error
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  // Return the found property
  res.status(200).json({
    status: "success",
    message: "Property fetched successfully",
    data: property,
  });
});



module.exports = {createProperties, getProperties, getPropertyById}