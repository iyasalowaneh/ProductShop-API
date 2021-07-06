const passport = require("passport");

const multer = require("multer");
const {
  productDelete,
  productList,
  productUpdate,
  fetchProduct,
} = require("../controllers/productsController");
const { fetchShop } = require("../controllers/shopsController ");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    const shop = await fetchShop(product.shopId, next);
    req.shop = shop;
    req.product = product;

    next();
  } else {
    const err = new Error("product not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", productList);

router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);
module.exports = router;
