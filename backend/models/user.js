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
    contacts: {
      type: [
        {
          type: {
            type: String,
            enum: ["linkedin", "github", "phone"],
          },
          value: {
            type: String,
          }
        }
      ],
      default: [
        { type: "github", value: "" },
        { type: "linkedin", value: "" },
        { type: "phone", value: "" }
      ]
    },
    photo: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    about: {
      type: String,
      default: "",
      trim: true,
    },
    skills : { 
      type : Array , 
      default : [] ,   
    },
    otp: String
    // blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
  }
);

module.exports = mongoose.model("User", userSchema);
