const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  }
)

module.exports = mongoose.model("rentTypes", RentTypeSchema);