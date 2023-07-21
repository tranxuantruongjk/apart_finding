const User = require("../../model/User");
const Post = require("../../model/Post");
const RentType = require("../../model/RentType");

const { ref, deleteObject, listAll } = require("firebase/storage");
const { storage } = require("../../firebase");

const statistic = async (req, res) => {
  const fullYear = new Date().getFullYear();
  try {
    const posts = await Post.find().select("createdAt");
    let statisticInYear = [];
    for (let i = 0; i < 12; i++) {
      let count = 0;
      let startDate, endDate;
      if (i !== 11) {
        startDate = new Date(fullYear, i, 1);
        endDate = new Date(fullYear, i + 1, 1);
      } else {
        startDate = new Date(fullYear, i, 1);
        endDate = new Date(fullYear + 1, 0, 1);
      }
      posts.forEach((post) => {
        if (post.createdAt >= startDate && post.createdAt < endDate) {
          count++;
        }
      });
      statisticInYear.push(count);
    }

    res.json({
      success: true,
      total: posts.length,
      statistic: statisticInYear,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const skip = (page - 1) * limit;

    let total;
    let posts;
    if (filter === "all") {
      total = await Post.find().countDocuments();
      posts = await Post.find()
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .populate("rentType", ["name"]);
    } else {
      total = await Post.find({ state: filter }).countDocuments();
      posts = await Post.find({ state: filter })
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .populate("rentType", ["name"]);
    }

    res.json({ success: true, total, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const approvePost = async (req, res) => {
  try {
    let updatedPost;
    if (req.params.action === "accept") {
      updatedPost = { state: "active", reason: "" };
    }
    if (req.params.action === "reject") {
      updatedPost = { state: "rejected", reason: req.body.reason };
    }
    const updateCondition = { _id: req.params.id };

    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

    res.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id };

    let deletedPost = await Post.findOneAndDelete(deleteCondition);

    if (!deletedPost) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

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

    res.json({
      success: true,
      message: "Bài viết đã được xóa thành công",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

module.exports = { statistic, getAllPosts, approvePost, deletePost };
