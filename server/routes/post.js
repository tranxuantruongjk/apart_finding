const express = require("express");
const router = express.Router();

const User = require("../model/User");
const RentType = require("../model/RentType");
const Post = require("../model/Post");

const verifyToken = require("../middleware/auth");
// const districts = require("hanhchinhvn/dist/quan-huyen/01.json");

// @route GET api/post/rentTypes
// @route Get rent types
// @access Public
router.get("/rentTypes", async (req, res) => {
  try {
    const rentTypes = await RentType.find({});
    res.json({ success: true, rentTypes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/post/search
// @route Get post which...
// @access Public
router.post("/search", async (req, res) => {
  const { typeId, district, ward, minPrice, maxPrice, minAcreage, maxAcreage } =
    req.body;
  const minPriceFind = minPrice * 1000000;
  const maxPriceFind = maxPrice * 1000000;

  if (district === "000") {
    try {
      const posts = await Post.find({
        rentType: typeId,
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
      }).populate("user", ["username", "phone"]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else if (ward === "00000") {
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${district}.json`);
    const wards = Object.values(wardsList);
    const wardsId = wards.map((ward) => ward.code);
    try {
      const posts = await Post.find({
        rentType: typeId,
        wardId: { $in: wardsId },
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
      }).populate("user", ["username", "phone"]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    try {
      const posts = await Post.find({
        rentType: typeId,
        wardId: ward,
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
      }).populate("user", ["username", "phone"]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

// @route GET api/post/:type
// @route Get all posts which have rentType = type
// @access Public
router.get("/:type", async (req, res) => {
  try {
    const posts = await Post.find({rentType: req.params.type}).populate("user", ["username", "phone"]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/post/:type/:id
// @route Get a post
// @access Public
router.get("/:type/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", ["username", "phone"])
      .populate("rentType", ["name"]);
    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/post/
// @route Get all posts
// @access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", ["username", "phone"]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

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

    res.json({
      success: true,
      message: "Thông tin phòng trọ đã đăng ký thành công!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
