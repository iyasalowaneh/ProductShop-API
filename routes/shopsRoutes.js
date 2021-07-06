const passport = require("passport");
const multer = require("multer");
const {
  shopCreat,
  shopList,
  fetchShop,
  productCreat,
} = require("../controllers/shopsController ");
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

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;

    next();
  } else {
    const err = new Error("shop not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", shopList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreat
);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreat
);

// router.delete("/:shopId", shopDelete);
// router.put("/:shopId", upload.single("image"), shopUpdate);
module.exports = router;
