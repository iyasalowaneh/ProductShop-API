const { Shop } = require("../db/models");
const { Product } = require("../db/models");
const { User } = require("../db/models");
const user = require("../db/models/user");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreat = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    console.log("here");
    console.log(req.user);

    req.body.userId = req.user.id;
    console.log(req.user);
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreat = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }

      req.body.shopId = req.shop.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      next({
        status: 401,
        message: "you can not create a product, the shop is not yours",
      });
    }
  } catch (error) {
    next(error);
  }
};

// exports.shopDelete = async (req, res, next) => {
//   try {
//     await req.shop.destroy();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

// exports.shopUpdate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/${req.file.path}`;
//     }
//     await req.shop.update(req.body);
//     res.status(201).json(req.shop);
//   } catch (error) {
//     next(error);
//   }
// };

exports.shopList = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Product,

        as: "products",

        attributes: ["id"],
      },
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
