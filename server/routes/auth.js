const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const verifyToken = require("../middleware/auth");
const verifyAdminToken = require("../middleware/authAdmin");

// const test = require("./test1.json");

// // @route
// router.get("/all", verifyAdminToken, async (req, res) => {
//   try {
//     const testData = Object.values(test);

//     for (let i = 0; i < 1554; i++) {
//       // Check for existing user
//       console.log(i);
//       const updatedUser = await User.findOneAndUpdate(
//         { phone: testData[i].data[0].phone_number },
//         { email: testData[i].data[0].userInfo[0].email },
//         { new: true }
//       );
//     }

//     res.json({
//       success: true,
//       message: "Thông tin phòng trọ đã đăng ký thành công!!!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
//   }
// });

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

// @route PUT api/auth/:id/changePassword
// @route User changes password
// @access Private
router.put("/:id/changePassword", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword, newPassword);

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin vẫn còn thiếu" });
  }

  if (req.params.id !== req.userId) {
    return res
      .status(401)
      .json({ success: false, message: "Người dùng chưa được xác thực" });
  }

  try {
    // Check for existing user
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy người dùng hoặc Người dùng không tồn tại",
      });

    // Username found
    const passwordValid = await argon2.verify(user.password, oldPassword);
    if (!passwordValid)
      return res.status(400).json({
        success: false,
        message: "Mật khẩu cũ đã nhập không đúng",
      });

    const hashedPassword = await argon2.hash(newPassword);
    let updatedUser = {
      password: hashedPassword,
    };

    updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });

    if (!updatedUser)
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy người dùng" });

    res.json({
      success: true,
      message: "Mật khẩu được cập nhật thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/auth
// @desc Update user's info
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { username, email, savedPost } = req.body;

  if (!username && !savedPost) {
    return res
      .status(400)
      .json({ success: false, message: "Tên là thông tin bắt buộc." });
  }

  try {
    let updatedUser = {
      username,
      email,
      savedPost,
    };

    const userUpdateCondition = { _id: req.params.id, _id: req.userId };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition,
      updatedUser,
      { new: true }
    );

    if (!updatedUser)
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy người dùng." });

    res.json({
      success: true,
      message: "Thông tin được cập nhật thành công.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi." });
  }
});

// @route POST api/auth/register
// @route Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, phone, email, password, role } = req.body;
  console.log(req.body);

  // Simple validation
  if (!username || !phone || !password)
    return res.status(400).json({
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
    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(2023, 5, 1),
      updatedAt: new Date(2023, 5, 1),
    });

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

    res.status(200).json({
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
      return res.status(400).json({
        success: false,
        message: "Incorrect username and/or password",
      });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.status(400).json({
        success: false,
        message: "Incorrect username and/or password",
      });

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

// @route GET api/auth/roleAdmin
// @route Get admin-role user(s)
// @access Public
router.get("/roleAdmin", async (req, res) => {
  try {
    const admins = await User.find({ role: 1 }).select("_id");

    res.json({ success: true, admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
