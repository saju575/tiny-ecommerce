const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const { successResponse } = require("../response/response.controller");

exports.handleAddtoCartNewItem = async (req, res, next) => {
  try {
    const { cart } = req.body;

    // check if user exists
    const existingUser = await User.findById(req.user._id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    existingUser.setCart(cart);

    return successResponse(res, {
      message: "cart updated successfully",
      payload: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
