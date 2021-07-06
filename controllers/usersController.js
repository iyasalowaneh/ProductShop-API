const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, "giveitasecretkey");
  return token;
};
