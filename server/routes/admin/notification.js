const express = require("express");
const router = express.Router();

const verifyAdminToken = require("../../middleware/authAdmin");

const Notification = require("../../model/Notification");

// @route POST api/admin/notifications
// @route Admin creates notification to send to user
// @access Private
router.post("/", verifyAdminToken, async (req, res) => {
  const { receiverId, title, action, reason } = req.body;

  if (!receiverId || !title || !action) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về thông báo không đủ" });
  }

  try {
    const newNotification = new Notification({
      senderId: req.userId,
      receiverId,
      title,
      action,
      reason,
    });

    await newNotification.save();

    res.json({ success: true, message: "Thông báo được lưu thành công", notification: newNotification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
