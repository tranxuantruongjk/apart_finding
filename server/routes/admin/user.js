const express = require("express");
const router = express.Router();

const User = require("../../model/User");
const verifyAdminToken = require("../../middleware/authAdmin");

// @route GET api/admin/users/statistic
// @route Admin statistic users
// @route Private
router.get("/statistic", verifyAdminToken, async (req, res) => {
  const fullYear = new Date().getFullYear();
  try {
    const users = await User.find().select("createdAt");
    let statisticInYear = [];
    for (let i = 0; i < 12; i++) {
      let count = 0;
      let startDate, endDate;
      if (i !== 11) {
        startDate = new Date(fullYear, i, 1);
        endDate = new Date(fullYear, i + 1, 1);
      } else {
        startDate = new Date(fullYear, i, 1);
        endDate = new Date(fullYear + 1, 0, 1);
      }
      users.forEach((user) => {
        if (user.createdAt >= startDate && user.createdAt < endDate) {
          count++;
        }
      });
      statisticInYear.push(count);
    }

    res.json({
      success: true,
      total: users.length,
      statistic: statisticInYear,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route GET api/admin/users
// @route Admin gets list of users
// @access Private
router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const { filter, page, limit } = req.query;
    const skip = (page - 1) * limit;

    let total;
    let users;
    if (filter === "all") {
      total = await User.find().countDocuments();
      users = await User.find()
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .select("-password");
    } else if (filter === "admin") {
      total = await User.find({ role: 1 }).countDocuments();
      users = await User.find({ role: 1 })
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .select("-password");
    } else {
      total = await User.find({ role: 0 }).countDocuments();
      users = await User.find({ role: 0 })
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .select("-password");
    }

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
    const deletedUser = await User.findOneAndDelete(deleteConditon).select(
      "-password"
    );

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
