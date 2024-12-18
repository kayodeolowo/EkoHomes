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
      required: [true, "Please add an image URL"],
     
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Property", propertySchema);
