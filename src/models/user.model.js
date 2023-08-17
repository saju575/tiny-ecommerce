const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

/* 
    making user model schema
*/
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "User name is required."],
      trim: true,
      minlength: [3, "User name must be at least 3 characters"],
      maxlength: [32, "User name must be less than 32 characters"],
    },
    email: {
      type: String,
      require: [true, "User email is required"],
      trim: true,
      unique: [true, "Given email is already in use."],
      lowercase: true,
      validate: {
        validator: (v) => {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          );
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [6, "User password must be at least 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: "image.png",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

/* 
    make a model name "User"
*/
const User = model("User", userSchema);

module.exports = User;
