const express = require("express");
const router = express.Router();

const { createType, updateType } = require("../../controllers/admin/TypeController");

const verifyAdminToken = require("../../middleware/authAdmin");

// @route POST api/admin/types
// @route Admin creates new type
// @access Private
router.post("/", verifyAdminToken, createType);

// @route PUT api/admin/types
// @route Admin updates type
// @access Private
router.put("/:id", verifyAdminToken, updateType);

module.exports = router;
