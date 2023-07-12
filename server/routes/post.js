const express = require("express");
const router = express.Router();

const User = require("../model/User");
const RentType = require("../model/RentType");
const Post = require("../model/Post");

const {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} = require("firebase/storage");
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
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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

      res.json({ success: true, posts: slicePosts, total: posts.length });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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
router.get("/type/:type", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ rentType: req.params.type })
      .sort("-createdAt")
      .populate("user", ["username", "phone"])
      .lean();

    const slicePosts = posts.slice(skip, limit * page);

    res.json({ success: true, posts: slicePosts, total: posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route GET api/posts/:type/:id
// @route Get a post
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", ["username", "phone"])
      .populate("rentType", ["name"])
      .lean();

    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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

    res.json({ success: true, posts: slicePosts, total: posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/posts/
// @route Update/Edit a post
// @access Private
router.put("/:id", verifyToken, upload.array("files"), async (req, res) => {
  const {
    title,
    content,
    rentType,
    districtId,
    wardId,
    streetName,
    houseNumber,
    exactAddress,
    gender,
    area,
    price,
    capacity,
    images,
    videos,
    utils,
  } = req.body;
  const files = req.files;

  if (
    !title ||
    !content ||
    !rentType ||
    !districtId ||
    !wardId ||
    !streetName ||
    !houseNumber ||
    !exactAddress ||
    !gender ||
    !area ||
    !price ||
    !capacity ||
    utils.length === 0 ||
    images.length === 0
  )
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về phòng trọ không đủ" });

  try {
    const districts = Object.values(districtsList);
    const districtFind = districts.find(
      (district) => district.code === districtId
    );
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${districtFind.code}.json`);
    const wards = Object.values(wardsList);
    const wardFind = wards.find((ward) => ward.code === wardId);

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
      streetName: streetName,
      houseNumber: houseNumber,
    };

    const utilsArray = utils.split(",");
    const imagesArray = images.split(",");
    const videosArray = videos.split(",");

    if (files.length !== 0) {
      for (const file of files) {
        const storageRef = ref(
          storage,
          `files/${req.params.id}/${file.originalname}`
        );
        const metadata = { contentType: file.mimetype };
        const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        if (file.mimetype.includes("image/")) {
          imagesArray.push(downloadURL);
        } else {
          videosArray.push(downloadURL);
        }
      }
    }

    let updatedPost = {
      title: req.body.title,
      content,
      rentType,
      address: exactAddress,
      fullAddressObject,
      area,
      price,
      capacity,
      gender,
      utils: utilsArray,
      images: imagesArray,
      videos: videosArray,
      state: "pending",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy bài viết hoặc Người dùng chưa được xác thực",
      });

    const listRef = ref(storage, `files/${req.params.id}`);
    await listAll(listRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          const downloadURL = await getDownloadURL(itemRef);
          if (
            !imagesArray.includes(downloadURL) &&
            !videos.includes(downloadURL)
          ) {
            deleteObject(itemRef);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    res.json({
      success: true,
      message:
        "Thông tin phòng trọ đã được cập nhật thành công và gửi đi đăng ký!!!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route DELETE api/posts/
// @route Delete a post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy bài viết hoặc Người dùng chưa được xác thực",
      });

    const listRef = ref(storage, `files/${req.params.id}`);
    await listAll(listRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          deleteObject(itemRef);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    res.json({ success: true, post: deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
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
    districtId,
    wardId,
    streetName,
    houseNumber,
    exactAddress,
    gender,
    area,
    price,
    capacity,
    utils,
  } = req.body;
  const files = req.files;

  if (
    !title ||
    !content ||
    !rentType ||
    !districtId ||
    !wardId ||
    !streetName ||
    !houseNumber ||
    !exactAddress ||
    !gender ||
    !area ||
    !price ||
    !capacity ||
    utils.length === 0 ||
    files.length === 0
  )
    return res
      .status(400)
      .json({ success: false, message: "Thông tin về phòng trọ không đủ" });

  try {
    const districts = Object.values(districtsList);
    const districtFind = districts.find(
      (district) => district.code === districtId
    );
    const wardsList = require(`hanhchinhvn/dist/xa-phuong/${districtFind.code}.json`);
    const wards = Object.values(wardsList);
    const wardFind = wards.find((ward) => ward.code === wardId);

    const fullAddressObject = {
      city: {
        code: "01",
        text: "Hà Nội",
      },
      district: {
        code: parseInt(districtFind.code),
        text: districtFind.name_with_type,
        cityCode: districtFind.parent_code,
      },
      ward: {
        code: parseInt(wardFind.code),
        text: wardFind.name_with_type,
        districtCode: parseInt(wardFind.parent_code),
      },
      streetName: streetName,
      houseNumber: houseNumber,
    };

    const utilsArray = utils.split(",");

    const newPost = new Post({
      title: req.body.title,
      content,
      rentType,
      address: exactAddress,
      fullAddressObject,
      area,
      price,
      capacity,
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
      postId: newPost._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
