const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password name is required"],
    },
    picture: {
      type: String,
      trim: true,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    cover: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },

    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [], //array of user ids
    },
    following: {
      type: Array,
      default: [], //array of user ids
    },
    followers: {
      type: Array,
      default: [], //array of user ids
    },
    requests: {
      type: Array,
      default: [], //array of user ids
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationShip: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
    savedPost: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
