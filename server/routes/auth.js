const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const verifyToken = require("../middleware/auth");

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

// @route POST api/auth/register
// @route Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, phone, email, password } = req.body;
  // console.log(req.body);

  // Simple validation
  if (!username || !phone || !password)
    return res
      .status(400)
      .json({
        success: false,
        message: "Missing username and/or password and/or phone",
      });

  try {
    // Check for existing user
    const user = await User.findOne({ phone });
    console.log('user', user);

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exist" });

    // All pass
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, phone, email, password: hashedPassword });
    console.log('newUser', newUser);
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

module.exports = router;
