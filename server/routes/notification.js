const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {
  getNotifications,
  updateToSeen,
  createNotification,
} = require("../controllers/NotificationController");

// @route GET api/notifications/:userId
// @route Get notifications of user
// @access Private
router.get("/:userId", verifyToken, getNotifications);

// @route PUT api/notifications/notificationId
// @route Update notification's state to seen
// @access Private
router.put("/:notificationId", verifyToken, updateToSeen);

// @route POST api/notifications
// @route Admin creates notification to send to user
// @access Private
router.post("/", verifyToken, createNotification);

module.exports = router;
