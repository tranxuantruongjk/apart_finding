const express = require("express");
const router = express.Router();

const Post = require("../../model/Post");

const { ref, deleteObject, listAll } = require("firebase/storage");
const { storage } = require("../../firebase");

const verifyAdminToken = require("../../middleware/authAdmin");

// @route GET apit/admin/posts/:id
// @route Admin get a post
// @route Private
router.get("/:id", verifyAdminToken, async (req, res) => {
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

// @route GET api/admin/posts
// @route Admin gets all posts
// @route Private
router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const posts = await Post.find().populate("rentType", ["name"]);

    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/admin/posts/accept/:id
// @route Admin accepts a post
// @route Private
router.put("/accept/:id", verifyAdminToken, async (req, res) => {
  try {
    let updatedPost = {
      state: "accepted",
    };
    const updateCondition = { _id: req.params.id };

    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

    res.json({
      success: true,
      message: "Bài viết đã được thông qua",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/admin/posts/reject/:id
// @route Admin rejects a post
// @route Private
router.put("/reject/:id", verifyAdminToken, async (req, res) => {
  try {
    let updatedPost = {
      state: "rejected",
    };
    const updateCondition = { _id: req.params.id };

    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

    res.json({
      success: true,
      message: "Bài viết đã được từ chối đăng",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route DELETE api/admin/posts/:id
// @route Admin deletes a post
// @route Private
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id };

    const deletedPost = await Post.findOneAndDelete(deleteCondition);

    if (!deletedPost) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

    const listRef = ref(storage, `files/${req.params.id}`);
    await listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef);
      });
    }).catch((error) => {
      console.log(error);
    });   

    res.json({
      success: true,
      message: "Bài viết đã được xóa thành công",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
