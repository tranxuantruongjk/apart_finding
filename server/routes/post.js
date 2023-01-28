const express = require("express");
const router = express.Router();

const User = require("../model/User");
const RentType = require("../model/RentType");
const Post = require("../model/Post");

const verifyToken = require("../middleware/auth");
// const districts = require("hanhchinhvn/dist/quan-huyen/01.json");

router.get("/rentTypes", verifyToken, async (req, res) => {
  try {
    const rentTypes = await RentType.find({});
    res.json({success: true, rentTypes});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal server error"});
  }
})

// @route GET api/post/:id
// @route Get a post
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', ['username', 'phone']).populate('rentType', ['name']);
    res.json({success: true, post});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal server error"});
  }
})

// @route GET api/post/
// @route Get all posts
// @access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['username', 'phone']);
    res.json({success: true, posts});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal server error"});
  }
})

// @route POST api/post/
// @route Create new post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, content, rentType, address, wardId, area, price, image } =
    req.body;

  if (
    !title ||
    !content ||
    !rentType ||
    !address ||
    !wardId ||
    !area ||
    !price ||
    !image
  )
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về phòng trọ không đủ" });

  // console.log(rentType);
  // const rentTypeFind = await RentType.findOne({ name: rentType });
  // console.log(rentTypeFind);
  // console.log(req.userId);

  try {
    const newPost = new Post({
      title,
      content,
      rentType,
      address,
      wardId,
      area,
      price,
      image,
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Thông tin phòng trọ đã đăng ký thành công!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
