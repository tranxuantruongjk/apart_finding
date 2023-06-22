const express = require("express");
const router = express.Router();

const User = require("../model/User");
const RentType = require("../model/RentType");
const Post = require("../model/Post");
// const PostFile = require("../model/PostFile");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebase");

var multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const verifyToken = require("../middleware/auth");
const districtsList = require("hanhchinhvn/dist/quan-huyen/01.json");
const mongoose = require("mongoose");

const utilsChecker = (arr, target) => target.every((t) => arr.includes(t));

// @route GET api/posts/postsCount
// @route GET number of posts
// @access Public
router.get("/postsCountByType", async (req, res) => {
  try {
    const rentTypes = await RentType.find().lean();
    const posts = await Post.find().select("rentType");

    for (const rentType of rentTypes) {
      const postsCount = posts.filter(
        (post) => post.rentType.toString() === rentType._id.toString()
      ).length;
      rentType.postsCount = postsCount;
    }

    res.json({ success: true, rentTypes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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
  const {
    typeId,
    district,
    ward,
    minPrice,
    maxPrice,
    minAcreage,
    maxAcreage,
    utils,
    gender,
  } = req.body;
  const minPriceFind = minPrice * 1000000;
  const maxPriceFind = maxPrice * 1000000;

  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  if (district === "000") {
    try {
      const posts = await Post.find({
        rentType: typeId ? mongoose.Types.ObjectId(typeId) : { $ne: null },
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
        gender:
          gender !== "any"
            ? gender === "male"
              ? { $in: ["any", "male"] }
              : { $in: ["any", "female"] }
            : { $in: ["any", "male", "female"] },
      })
        .sort("-createdAt")
        .populate("user", ["username", "phone"])
        .lean();

      let slicePosts;

      if (utils && utils.length !== 0) {
        slicePosts = posts.filter((post) => utilsChecker(post.utils, utils));

        slicePosts = slicePosts.slice(skip, limit * page);
      } else {
        slicePosts = posts.slice(skip, limit * page);
      }

      // for (const post of slicePosts) {
      //   const postFiles = await PostFile.find({ postId: post._id });
      //   const files = postFiles.map((postFile) => postFile.file);
      //   post.files = files;
      // }
      res.json({ success: true, posts: slicePosts, total: posts.length });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else if (ward === "00000") {
    try {
      const posts = await Post.find({
        rentType: typeId ? mongoose.Types.ObjectId(typeId) : { $ne: null },
        "fullAddressObject.district.code": parseInt(district),
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
        gender:
          gender !== "any"
            ? gender === "male"
              ? { $in: ["any", "male"] }
              : { $in: ["any", "female"] }
            : { $in: ["any", "male", "female"] },
      })
        .sort("-createdAt")
        .populate("user", ["username", "phone"])
        .lean();

      let slicePosts;

      if (utils && utils.length !== 0) {
        slicePosts = posts.filter((post) => utilsChecker(post.utils, utils));

        slicePosts = slicePosts.slice(skip, limit * page);
      } else {
        slicePosts = posts.slice(skip, limit * page);
      }

      // for (const post of slicePosts) {
      //   const postFiles = await PostFile.find({ postId: post._id });
      //   const files = postFiles.map((postFile) => postFile.file);
      //   post.files = files;
      // }
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
        rentType: typeId ? mongoose.Types.ObjectId(typeId) : { $ne: null },
        "fullAddressObject.ward.code": parseInt(ward),
        price: { $gte: parseInt(minPriceFind), $lte: parseInt(maxPriceFind) },
        area: {
          $gte: parseInt(minAcreage),
          $lte: parseInt(maxAcreage),
        },
        gender:
          gender !== "any"
            ? gender === "male"
              ? { $in: ["any", "male"] }
              : { $in: ["any", "female"] }
            : { $in: ["any", "male", "female"] },
      })
        .sort("-createdAt")
        .populate("user", ["username", "phone"])
        .lean();

      let slicePosts;

      if (utils && utils.length !== 0) {
        slicePosts = posts.filter((post) => utilsChecker(post.utils, utils));

        slicePosts = slicePosts.slice(skip, limit * page);
      } else {
        slicePosts = posts.slice(skip, limit * page);
      }

      // for (const post of posts) {
      //   const postFiles = await PostFile.find({ postId: post._id });
      //   const files = postFiles.map((postFile) => postFile.file);
      //   post.files = files;
      // }
      res.json({ success: true, posts: slicePosts, total: posts.length });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

// @route GET api/posts/:userId/posts
// @route Get all posts which userId's user posted
// @access Private
router.get("/:userId/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).sort(
      "-createdAt"
    );
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts/userId/savedPosts
// @route Get all posts which userId's user saved
// @access Private
router.get("/:userId/savedPosts", verifyToken, async (req, res) => {
  try {
    const savedPostsId = await User.findById(req.params.userId).select(
      "savedPost"
    );

    let savedPosts = [];

    if (savedPostsId.savedPost.length === 0) {
      return res.json({ success: true, savedPosts });
    }

    for (let i = 0; i < savedPostsId.savedPost.length; i++) {
      const savedPost = await Post.findById(savedPostsId.savedPost[i])
        .sort("-createdAt")
        .populate("user", ["username", "phone"])
        .lean();
      // const postFiles = await PostFile.find({
      //   postId: savedPostsId.savedPost[i],
      // });
      // const files = postFiles.map((postFile) => postFile.file);
      // savedPost.files = files;
      if (savedPost) {
        savedPosts.push(savedPost);
      }
    }

    res.json({ success: true, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route GET api/posts/:type
// @route Get all posts which have rentType = type
// @access Public
router.get("/:type", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ rentType: req.params.type })
      .sort("-createdAt")
      .populate("user", ["username", "phone"])
      .lean();

    const slicePosts = posts.slice(skip, limit * page);

    // for (const post of slicePosts) {
    //   const postFiles = await PostFile.find({ postId: post._id });
    //   const files = postFiles.map((postFile) => postFile.file);
    //   post.files = files;
    // }
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
      .populate("rentType", ["name"])
      .lean();

    // const postFiles = await PostFile.find({ postId: req.params.id });
    // post.files = postFiles;

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
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort("-createdAt")
      .populate("user", ["username", "phone"])
      .lean();

    const slicePosts = posts.slice(skip, limit * page);

    // for (const post of slicePosts) {
    //   const postFiles = await PostFile.find({ postId: post._id });
    //   const files = postFiles.map((postFile) => postFile.file);
    //   post.files = files;
    // }

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
  const {
    title,
    content,
    rentType,
    address,
    location,
    gender,
    area,
    price,
    utils,
  } = req.body;
  const files = req.files;

  if (
    !title ||
    !content ||
    !rentType ||
    !address ||
    !gender ||
    !area ||
    !price ||
    !location ||
    utils.length === 0 ||
    files.length === 0
  )
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về phòng trọ không đủ" });

  try {
    const addressArray = address.split(", ");
    const length = addressArray.length;
    const districts = Object.values(districtsList);
    const districtFind = districts.find(
      (district) => district.name === addressArray[length - 3]
    );
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${districtFind.code}.json`);
    const wards = Object.values(wardsList);
    const wardFind = wards.find(
      (ward) => ward.name === addressArray[length - 4]
    );
    let detailStreet;
    let index = -1;
    if (addressArray[length - 5]) {
      detailStreet =
        addressArray[length - 5] && addressArray[length - 5].split(" ");
      for (let i = 0; i < detailStreet.length; i++) {
        if (detailStreet[i].match(/\d/)) {
          index = i;
        }
      }
    }

    const fullAddressObject = {
      city: {
        code: "01",
        text: "Hà Nội",
      },
      district: {
        code: districtFind.code,
        text: districtFind.name_with_type,
        cityCode: districtFind.parent_code,
      },
      ward: {
        code: wardFind.code,
        text: wardFind.name_with_type,
        districtCode: wardFind.parent_code,
      },
      streetName:
        detailStreet &&
        detailStreet.slice(index + 1, detailStreet.length).join(" "),
      houseName: detailStreet && detailStreet.slice(0, index + 1).join(" "),
    };

    const utilsArray = utils.split(",");
    const geocode = location.split(",");
    const locationCode = {
      lat: geocode[0],
      lng: geocode[1],
    };

    const newPost = new Post({
      title: req.body.title,
      content,
      rentType,
      address,
      fullAddressObject,
      location: locationCode,
      area,
      price,
      gender,
      utils: utilsArray,
      user: req.userId,
    });

    await newPost.save();

    const images = [];
    const videos = [];

    for (const file of files) {
      const storageRef = ref(
        storage,
        `files/${newPost._id}/${file.originalname}`
      );
      const metadata = { contentType: file.mimetype };
      const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      // const newPostFile = new PostFile({
      //   postId: newPost._id,
      //   type: file.mimetype.includes("image/") ? "image" : "video",
      //   file: downloadURL,
      // });

      // await newPostFile.save();
      if (file.mimetype.includes("image/")) {
        images.push(downloadURL);
      } else {
        videos.push(downloadURL);
      }
    }

    await Post.findByIdAndUpdate(newPost._id, {
      images: images,
      videos: videos,
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
