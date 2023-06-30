const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const Notification = require("../model/Notification");

// @route GET api/notifications/:userId
// @route Get notifications of user
// @access Private
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.params.userId,
    }).sort("-createdAt");

    res.json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/notifications/notificationId
// @route Update notification's state to seen
// @access Private
router.put("/:notificationId", verifyToken, async (req, res) => {
  try {
    let updatedNotification = {
      seen: true,
    };

    const notificationUpdateCondition = {
      _id: req.params.notificationId,
      receiverId: req.userId,
    };

    updatedNotification = await Notification.findOneAndUpdate(
      notificationUpdateCondition,
      updatedNotification,
      { new: true }
    );

    if (!updatedNotification)
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy thông báo hoặc Người dùng chưa được xác thực",
      });

    res.json({ success: true, notification: updatedNotification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" })
  }
});

module.exports = router;
