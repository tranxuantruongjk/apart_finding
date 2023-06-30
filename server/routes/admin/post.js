const express = require("express");
const router = express.Router();

const Post = require("../../model/Post");
const RentType = require("../../model/RentType");

const { ref, deleteObject, listAll } = require("firebase/storage");
const { storage } = require("../../firebase");

const verifyAdminToken = require("../../middleware/authAdmin");
// const test = require("./test1.json");

// const utilsArray = [
//   "room_bathroom",
//   "parking_situation",
//   "curfew_situation",
//   "room_wifi",
//   "air_conditioner",
//   "water_heater",
//   "room_kitchen",
//   "room_refrigerator",
//   "room_washing_machine",
//   "room_bed",
//   "room_closet",
//   "loft",
//   "balcony",
//   "room_pets_allowed",
//   "security_guard",
//   "share_home_as_landlord",
// ]

// const fillPrice = (price) => {
//   let priceText = price.toString();
//   if (priceText.length < 5) {
//     priceText = priceText.padEnd(7, "0");
//     return parseInt(priceText);
//   }
//   return price;
// };

// const fillType = (room_type, typesArray) => {
//   if (room_type === "Apartment") {
//     room_type = "House";
//   }
//   for (let type of typesArray) {
//     if (type.type === room_type) {
//       return type._id;
//     }
//   }
// };

// const fillUtils = (post) => {
//   let utils = [];
//   for(let util of utilsArray) {
//     if (post[util] === true) {
//       utils.push(util);
//     }
//   }

//   return utils;
// }

// @route
// router.get("/all", verifyAdminToken, async (req, res) => {
//   try {
//     const rentTypes = await RentType.find().lean();

//     const testData = Object.values(test);

//     for (let i = 1344; i >= 0; i--) {
//       const newPost = new Post({
//         title: testData[i].data[0].room_name,
//         content: testData[i].data[0].notes,
//         rentType: fillType(testData[i].data[0].room_type, rentTypes),
//         address: testData[i].data[0].exact_room_address,
//         fullAddressObject: testData[i].data[0].full_address_object,
//         location: testData[i].data[0].geocodingApi.location,
//         utils: fillUtils(testData[i].data[0]),
//         gender: testData[i].data[0].gender,
//         area: testData[i].data[0].room_area,
//         price: fillPrice(testData[i].data[0].room_price),
//         images: testData[i].data[0].upload_room_images,
//         owner: {
//           name: testData[i].data[0].userInfo[0].name,
//           phone: testData[i].data[0].phone_number,
//         },
//         state: "active",
//       });

//       await newPost.save();
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

// @route GET api/admin/posts/:id
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
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const total = await Post.find().countDocuments();

    const posts = await Post.find()
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .populate("rentType", ["name"]);

    res.json({ success: true, total, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
});

// @route PUT api/admin/posts/:action/:id
// @route Admin accepts/rejects a post
// @route Private
router.put("/:action/:id", verifyAdminToken, async (req, res) => {
  try {
    let updatedPost;
    if (req.params.action === "accept") {
      updatedPost = { state: "active" };
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
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
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
});

module.exports = router;
