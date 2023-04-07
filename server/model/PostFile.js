const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostFileSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    file: {
      type: String,
      require: true,
    }
  }, 
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("postfiles", PostFileSchema);