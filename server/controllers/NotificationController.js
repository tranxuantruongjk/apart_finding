const Notification = require("../model/Notification");

const getNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find({
      receiverId: req.params.userId,
    })
      .sort("-createdAt")
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

const updateToSeen = async (req, res) => {
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
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const createNotification = async (req, res) => {
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

module.exports = { getNotifications, updateToSeen, createNotification }
