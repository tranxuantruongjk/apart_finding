const express = require("express");
const router = express.Router();

const { statistic, getAllPosts, updateStatePost, deletePost } = require("../../controllers/admin/PostController");

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
// ];

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
//   for (let util of utilsArray) {
//     if (post[util] === true) {
//       utils.push(util);
//     }
//   }

//   return utils;
// };

// // @route
// router.get("/all", verifyAdminToken, async (req, res) => {
//   try {
//     const rentTypes = await RentType.find().lean();

//     const testData = Object.values(test);

//     for (let i = 274; i >= 0; i--) {
//       console.log(i);
//       const user = await User.findOne({
//         phone: testData[i].data[0].phone_number,
//       });

//       const newPost = new Post({
//         title: testData[i].data[0].room_name,
//         content: testData[i].data[0].notes,
//         rentType: fillType(testData[i].data[0].room_type, rentTypes),
//         address: testData[i].data[0].exact_room_address,
//         fullAddressObject: testData[i].data[0].full_address_object,
//         location: testData[i].data[0].geocodingApi.location,
//         utils: fillUtils(testData[i].data[0]),
//         gender: "any",
//         area: testData[i].data[0].room_area,
//         price: fillPrice(testData[i].data[0].room_price),
//         images: testData[i].data[0].upload_room_images,
//         user: user._id,
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

// @route GET api/admin/users/statistic
// @route Admin statistic users
// @route Private
router.get("/statistic", verifyAdminToken, statistic);

// @route GET api/admin/posts
// @route Admin gets all posts
// @route Private
router.get("/", verifyAdminToken, getAllPosts);

// @route PUT api/admin/posts/:action/:id
// @route Admin accepts/rejects a post
// @route Private
router.put("/:action/:id", verifyAdminToken, updateStatePost);

// @route DELETE api/admin/posts/:id
// @route Admin deletes a post
// @route Private
router.delete("/:id", verifyAdminToken, deletePost);

module.exports = router;
