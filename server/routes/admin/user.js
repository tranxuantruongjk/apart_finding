const express = require("express");
const router = express.Router();

const { statistic, getAllUsers, changeUserState, deleteUser } = require("../../controllers/admin/UserController");

const verifyAdminToken = require("../../middleware/authAdmin");

// @route GET api/admin/users/statistic
// @route Admin statistic users
// @route Private
router.get("/statistic", verifyAdminToken, statistic);

// @route GET api/admin/users
// @route Admin gets list of users
// @access Private
router.get("/", verifyAdminToken, getAllUsers);

// @route PUT api/admin/users/:action/:id
// @route Admin blocks/unblocks a user account
// @route Private
router.put("/:action/:id", verifyAdminToken, changeUserState);

// @route DELETE api/admin/users/delete/:id
// @route Admin delete a user account
// @route Private
router.delete("/:id", verifyAdminToken, deleteUser);

module.exports = router;
