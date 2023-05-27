const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostFileSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    }
  }, 
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("postfiles", PostFileSchema);