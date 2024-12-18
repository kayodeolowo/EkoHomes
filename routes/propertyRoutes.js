const express = require("express");
const {
  getProperties,
  createProperties,
  getPropertyById,
} = require("../controllers/propertyController");
const router = express.Router();

router.route("/properties").get(getProperties);
router.route("/properties/:id").get(getPropertyById);
router.route("/createProperty").post(createProperties);

module.exports = router;
