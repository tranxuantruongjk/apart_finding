const express = require("express");
const router = express.Router();

const User = require("../model/User");
const RentType = require("../model/RentType");
const Post = require("../model/Post");
const PostFile = require("../model/PostFile");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebase");

var multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const verifyToken = require("../middleware/auth");
// const districts = require("hanhchinhvn/dist/quan-huyen/01.json");

// @route GET api/posts/postsCount
// @route GET number of posts
// @access Public
router.get("/postsCount", async (req, res) => {
  try {
    const posts = await Post.find().select("rentType");
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi"});
  }
});

// @route GET api/posts/rentTypes
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

// @route GET api/posts/search
// @route Get post which...
// @access Public
router.post("/search", async (req, res) => {
  const { typeId, district, ward, minPrice, maxPrice, minAcreage, maxAcreage } =
    req.body;
  const minPriceFind = minPrice * 1000000;
  const maxPriceFind = maxPrice * 1000000;

  const {page, limit} = req.query;
  const skip = (page - 1) * limit;

  if (district === "000") {
    try {
      const posts = await Post.find({
        rentType: typeId,
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
      }).populate("user", ["username", "phone"]).lean();

      const slicePosts = posts.slice(skip, limit*page);

      for (const post of slicePosts) {
        const postFiles = await PostFile.find({ postId: post._id });
        const files = postFiles.map((postFile) => postFile.file);
        post.files = files;
      }
      res.json({ success: true, posts: slicePosts, total: posts.length });
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
      }).populate("user", ["username", "phone"]).lean();

      const slicePosts = posts.slice(skip, limit*page);

      for (const post of slicePosts) {
        const postFiles = await PostFile.find({ postId: post._id });
        const files = postFiles.map((postFile) => postFile.file);
        post.files = files;
      }
      res.json({ success: true, posts: slicePosts, total: posts.length });
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
      }).populate("user", ["username", "phone"]).lean();

      const slicePosts = posts.slice(skip, limit*page);

      for (const post of posts) {
        const postFiles = await PostFile.find({ postId: post._id });
        const files = postFiles.map((postFile) => postFile.file);
        post.files = files;
      }
      res.json({ success: true, posts: slicePosts, total: posts.length });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

// @route GET api/posts/:userId
// @route Get all posts which userId's user posted
// @access Public
router.get("/:userId/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts/:type
// @route Get all posts which have rentType = type
// @access Public
router.get("/:type", async (req, res) => {
  try {
    const {page, limit} = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ rentType: req.params.type }).populate(
      "user",
      ["username", "phone"]
    ).lean();

    const slicePosts = posts.slice(skip, limit*page);

    for (const post of slicePosts) {
      const postFiles = await PostFile.find({ postId: post._id });
      const files = postFiles.map((postFile) => postFile.file);
      post.files = files;
    }
    res.json({ success: true, posts: slicePosts, total: posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts/:type/:id
// @route Get a post
// @access Public
router.get("/:type/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", ["username", "phone"])
      .populate("rentType", ["name"]).lean();
    
    const postFiles = await PostFile.find({ postId: req.params.id });
    // const files = postFiles.map((postFile) => postFile.file);
    post.files = postFiles;
    // console.log(post);

    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts/
// @route Get all posts
// @access Public
router.get("/", async (req, res) => {
  try {
    const {page, limit} = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find().populate("user", ["username", "phone"]).lean();

    const slicePosts = posts.slice(skip, limit*page);

    for (const post of slicePosts) {
      const postFiles = await PostFile.find({ postId: post._id });
      const files = postFiles.map((postFile) => postFile.file);
      post.files = files;
    }
    
    res.json({ success: true, posts: slicePosts, total: posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts/
// @route Create new post
// @access Private
router.post("/", verifyToken, upload.array("files"), async (req, res) => {
  const { title, content, rentType, address, wardId, area, price } = req.body;
  const files = req.files;

  if (
    !title ||
    !content ||
    !rentType ||
    !address ||
    !wardId ||
    !area ||
    !price ||
    files.length === 0
  )
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về phòng trọ không đủ" });

  try {
    const newPost = new Post({
      title: req.body.title,
      content,
      rentType,
      address,
      wardId,
      area,
      price,
      user: req.userId,
    });

    await newPost.save();

    files.forEach(async (file) => {
      const storageRef = ref(
        storage,
        `files/${newPost._id}/${file.originalname}`
      );
      const metadata = { contentType: file.mimetype };
      const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const newPostFile = new PostFile({
        postId: newPost._id,
        type: file.mimetype.includes("image/") ? "image" : "video",
        file: downloadURL,
      });

      await newPostFile.save();
    });

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
