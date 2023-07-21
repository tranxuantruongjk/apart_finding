const Notification = require("../../model/Notification");

const getAdminNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find({
      receiverId: req.params.userId,
    })
      .sort("-createdAt")
      .populate("senderId", ["username"])
      .populate("postId", ["title"]);

    notifications = notifications.filter(
      (notification) => notification.postId !== null
    );

    res.json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const createAdminNotification = async (req, res) => {
  const { receiverId, postId, action, reason } = req.body;

  if (!receiverId || !postId || !action) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về thông báo không đủ" });
  }

  try {
    const newNotification = new Notification({
      senderId: req.userId,
      receiverId,
      postId,
      action,
      reason,
    });

    await newNotification.save();

    res.json({
      success: true,
      message: "Thông báo được lưu thành công",
      notification: newNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

module.exports = { getAdminNotifications, createAdminNotification };
