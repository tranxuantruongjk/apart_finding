const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {
  getUserInfo,
  changePassword,
  updateUserInfo,
  registerUser,
  loginUser,
  getRoleAdmin,
} = require("../controllers/AuthController");

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
router.get("/", verifyToken, getUserInfo);

// @route PUT api/auth/:id/changePassword
// @route User changes password
// @access Private
router.put("/:id/changePassword", verifyToken, changePassword);

// @route PUT api/auth
// @desc Update user's info
// @access Private
router.put("/:id", verifyToken, updateUserInfo);

// @route POST api/auth/register
// @route Register user
// @access Public
router.post("/register", registerUser);

// @route POST api/auth/login
// @route Login user
// @access Public
router.post("/login", loginUser);

// @route GET api/auth/roleAdmin
// @route Get admin-role user(s)
// @access Public
router.get("/roleAdmin", getRoleAdmin);

module.exports = router;
