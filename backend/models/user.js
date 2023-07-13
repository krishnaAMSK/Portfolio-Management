const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
    // blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
  }
);

module.exports = mongoose.model("User", userSchema);
