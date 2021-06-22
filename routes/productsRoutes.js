const {
  productCreat,
  productDelete,
  productList,
  productUpdate,
  fetchProduct,
} = require("../controllers/productsController");
const express = require("express");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;

    next();
  } else {
    const err = new Error("product not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", productList);

router.post("/", productCreat);

router.delete("/:productId", productDelete);
router.put("/:productId", productUpdate);
module.exports = router;
