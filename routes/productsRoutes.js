const multer = require("multer");
const {
  productCreat,
  productDelete,
  productList,
  productUpdate,
  fetchProduct,
} = require("../controllers/productsController");
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
    req.product = product;

    next();
  } else {
    const err = new Error("product not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", productList);

router.post("/", upload.single("image"), productCreat);

router.delete("/:productId", productDelete);
router.put("/:productId", upload.single("image"), productUpdate);
module.exports = router;
