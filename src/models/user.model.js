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

    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
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
userSchema.methods.setCart = function (newCart) {
  this.cart = newCart;
  return this.save();
};
const User = model("User", userSchema);

module.exports = User;
