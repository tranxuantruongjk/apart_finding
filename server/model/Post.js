const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema (
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    rentType: {
      type: Schema.Types.ObjectId,
      ref: 'rentTypes',
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    fullAddressObject: {
      type: Schema.Types.Mixed,
      require: true,
    },
    location: {
      type: Schema.Types.Mixed,
      require: true,
    },
    utils: {
      type: Array,
      require: true,
    },
    area: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    }, 
    state: {
      type: String,
      default: "pending",
      require: true,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("posts", PostSchema);