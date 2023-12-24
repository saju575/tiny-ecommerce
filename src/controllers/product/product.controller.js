const Product = require("../../models/product.model");
const { successResponse } = require("../response/response.controller");

exports.addNewProduct = async (req, res, next) => {
  try {
    const { title, imageUrl, color, size } = req.body;

    // Validate the request data
    if (!title || !imageUrl || !color || !size) {
      throw new Error("All fields are required");
    }

    // Create a new product
    const newProduct = await Product.create({
      title,
      imageUrl,
      color,
      size,
    });

    return successResponse(res, { payload: newProduct });
  } catch (error) {
    next(error);
  }
};

/** get all products */
exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    return successResponse(res, { payload: allProducts });
  } catch (error) {
    next(error);
  }
};

/** */
exports.getSingleProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return successResponse(res, {
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};
