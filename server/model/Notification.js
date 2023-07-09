const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notifications", NotificationSchema);
