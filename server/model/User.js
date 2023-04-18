const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,  
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
