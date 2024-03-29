const RentType = require("../../model/RentType");

const createType = async (req, res) => {
  const { type, name } = req.body;

  if (!type || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin loại phòng không đủ" });
  }

  try {
    const rentType = await RentType.findOne({ type });

    if (rentType) {
      return res
        .status(400)
        .json({ success: false, message: "Loại phòng này đã tồn tại" });
    }

    const newRentType = new RentType({ type, name });
    await newRentType.save();

    res.json({ success: true, message: "Tạo loại phòng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

const updateType = async (req, res) => {
  const { type, name } = req.body;

  if (!type || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin loại phòng không đủ" });
  }

  try {
    let updatedType = {
      type,
      name,
    };

    updatedType = await RentType.findByIdAndUpdate(req.params.id, updatedType, {
      new: true,
    });

    res.json({
      success: true,
      message: "Cập nhật thành công",
      type: updatedType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
  }
};

module.exports = { createType, updateType };
