const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostImageSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      require: true
    },
    image: {
      type: String,
      require: true,
    }
  }, 
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("postimages", PostImageSchema);