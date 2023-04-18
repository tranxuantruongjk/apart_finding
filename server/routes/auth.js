const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const verifyToken = require("../middleware/auth");
const verifyAdminToken = require("../middleware/authAdmin");

// @route GET api/auth
// @desc Check it user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/auth
// @desc Update user's info
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { username, email } = req.body;

  if (!username) {
    return res.status(400).json({success: false, message: "Tên là thông tin bắt buộc."});
  }

  try {
    let updatedUser = {
      username,
      email,
    }

    const userUpdateCondition = {_id: req.params.id, _id: req.userId};

    updatedUser = await User.findOneAndUpdate(userUpdateCondition, updatedUser, {new: true});

    if (!updatedUser)
    return res.status(401).json({success: false, message: "Không tìm thấy người dùng."});

    res.json({success: true, message: "Thông tin được cập nhật thành công.", user: updatedUser});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Đã xảy ra lỗi."});
  }
})

// @route POST api/auth/register
// @route Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, phone, email, password, role } = req.body;
  // console.log(req.body);

  // Simple validation
  if (!username || !phone || !password)
    return res
      .status(400)
      .json({
        success: false,
        message: "Missing username and/or password and/or phone",
      });

  if (role === 1) verifyAdminToken(req, res);

  try {
    // Check for existing user
    const user = await User.findOne({ phone });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exist" });

    // All pass
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, phone, email, password: hashedPassword, role });

    await newUser.save();
    // console.log(newUser);
    // Sau khi user register thi se tra lai access token
    // Moi khi user can request thi user se dinh token vao header,
    // server kiem tra
    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res
      .status(200)
      .json({
        success: true,
        message: "User created successfully.",
        accessToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @route Login user
// @access Public
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  // Simple validation
  if (!phone || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing phone and/or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ phone });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username and/or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username and/or password" });

    // All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully.", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/auth/admin/usersList
// @route Admin gets list of users
// @access Private
router.get("/admin/usersList", verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
