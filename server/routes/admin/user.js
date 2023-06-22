const express = require("express");
const router = express.Router();

const User = require("../../model/User");
const verifyAdminToken = require("../../middleware/authAdmin");

// @route GET api/admin/users
// @route Admin gets list of users
// @access Private
router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const total = await User.find().countDocuments();

    const users = await User.find()
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .select("-password");

    res.json({ success: true, total, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/admin/users/block/:id
// @route Admin blocks a user account
// @route Private
router.put("/:action/:id", verifyAdminToken, async (req, res) => {
  try {
    let updatedUser;
    if (req.params.action === "block") {
      updatedUser = {
        state: "blocked",
      };
    }
    if (req.params.action === "unblock") {
      updatedUser = {
        state: "active",
      };
    }

    const updateCondition = { _id: req.params.id };

    updatedUser = await User.findOneAndUpdate(updateCondition, updatedUser, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route DELETE api/admin/users/delete/:id
// @route Admin delete a user account
// @route Private
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    const deleteConditon = { _id: req.params.id };
    const deletedUser = await User.findOneAndDelete(deleteConditon).select("-password");

    if (!deletedUser) {
      res
        .status(401)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    res.json({ success: true, user: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
