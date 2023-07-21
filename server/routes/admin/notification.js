const express = require("express");
const router = express.Router();

const { getAdminNotifications, createAdminNotification } = require("../../controllers/admin/NotificationController");

const verifyAdminToken = require("../../middleware/authAdmin");

// @route GET api/admin/notifications/:userId
// @route Get notifications of user
// @access Private
router.get("/:userId", verifyAdminToken, getAdminNotifications);

// @route POST api/admin/notifications
// @route Admin creates notification to send to user
// @access Private
router.post("/", verifyAdminToken, createAdminNotification);

module.exports = router;
