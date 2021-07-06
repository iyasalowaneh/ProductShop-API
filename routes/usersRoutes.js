const { signup } = require("../controllers/usersController");
const { signin } = require("../controllers/usersController");

const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
