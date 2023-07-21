const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

var multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const {
  getPostsCountByType,
  getRentTypes,
  searchPosts,
  getPostsByUser,
  getSavedPostByUser,
  getPostsByType,
  getPostInfo,
  getAllPosts,
  updatePostInfo,
  deletePost,
  createPost,
} = require("../controllers/PostController");

// @route GET api/posts/postsCount
// @route GET number of posts
// @access Public
router.get("/postsCountByType", getPostsCountByType);

// @route GET api/posts/rentTypes
// @route Get rent types
// @access Public
router.get("/rentTypes", getRentTypes);

// @route GET api/posts/search
// @route Get post which...
// @access Public
router.post("/search", searchPosts);

// @route GET api/posts/:userId/posts
// @route Get all posts which userId's user posted
// @access Private
router.get("/:userId/posts", verifyToken, getPostsByUser);

// @route GET api/posts/userId/savedPosts
// @route Get all posts which userId's user saved
// @access Private
router.get("/:userId/savedPosts", verifyToken, getSavedPostByUser);

// @route GET api/posts/:type
// @route Get all posts which have rentType = type
// @access Public
router.get("/type/:type", getPostsByType);

// @route GET api/posts/:type/:id
// @route Get a post
// @access Public
router.get("/:id", getPostInfo);

// @route GET api/posts/
// @route Get all posts
// @access Public
router.get("/", getAllPosts);

// @route PUT api/posts/
// @route Update/Edit a post
// @access Private
router.put("/:id", verifyToken, upload.array("files"), updatePostInfo);

// @route DELETE api/posts/
// @route Delete a post
// @access Private
router.delete("/:id", verifyToken, deletePost);

// @route POST api/posts/
// @route Create new post
// @access Private
router.post("/", verifyToken, upload.array("files"), createPost);

module.exports = router;
