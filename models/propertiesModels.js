const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    property_name: {
      type: String,
      required: [true, "Please add the property name"],
    },

    address: {
      type: String,
      required: [true, "Please add the address"],
    },

    price: {
      type: Number,
      required: [true, "Please add the price"],
    },

    property_type: {
      type: String,
      enum: ["House", "Condo", "Apartment", "Land"],
      required: [true, "Please add the property type"],
    },

    image: {
      type: String,
      default:
        "https://via.placeholder.com/150", // Placeholder image if none is provided
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Property", propertySchema);
