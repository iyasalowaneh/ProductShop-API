const { Product } = require("../db/models");
const { Shop } = require("../db/models");
exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);

    return product;
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    if (req.shop.userId !== req.user.id)
      throw { status: 401, message: "you can not delete a product" };

    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.shop.userId !== req.user.id)
      throw { status: 401, message: "you can not update a product" };
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    await req.product.update(req.body);
    res.status(201).json(req.product);
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
