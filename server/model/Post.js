const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema (
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rentType: {
      type: Schema.Types.ObjectId,
      ref: 'rentTypes',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    fullAddressObject: {
      type: Schema.Types.Mixed,
      required: true,
      // city: {
      //   code: {
      //     type: String,
      //     default: "01",
      //   },
      //   text: {
      //     type: String,
      //     default: "Hà Nội"
      //   }
      // },
      // district: {
      //   code: {
      //     type: String,
      //     required: true,
      //   },
      //   text: {
      //     type: String,
      //     required: true,
      //   },
      //   cityCode: {
      //     type: String,
      //     required: true,
      //   }
      // },
      // ward: {
      //   code: {
      //     type: String,
      //     required: true,
      //   },
      //   text: {
      //     type: String,
      //     required: true,
      //   },
      //   districtCode: {
      //     type: String,
      //     required: true,
      //   }
      // },
      // streetName: {
      //   type: String,
      //   required: true,
      // },
      // houseNumber: {
      //   type: String
      // }
    },
    utils: {
      type: Array,
      required: true,
    },
    gender: {
      type: String,
      default: "any",
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      // required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    videos: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    state: {
      type: String,
      default: "pending",
      required: true,
    },
    reason: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("posts", PostSchema);