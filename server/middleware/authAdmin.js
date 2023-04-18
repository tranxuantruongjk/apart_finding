const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Không tìm thấy token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Token không tồn tại" });
  }

  try {
    const admin = await User.findById(req.userId).select("-password");

    if (!admin)
      return res
        .status(400)
        .json({
          success: false,
          message: "Không tìm thấy thông tin tài khoản",
        });

    if (admin.role === 0)
      return res
        .status(400)
        .json({ success: false, message: "Quyền truy cập bị từ chối" });

    if (next) {
      next();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

module.exports = verifyAdminToken;
