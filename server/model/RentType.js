const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentTypeSchema = new Schema(
  {
    name: {
      type: String,
      require
    }
  }
)

module.exports = mongoose.model("rentTypes", RentTypeSchema);