const LocalStrategy = require("passport-local");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passwordsMatch ? user : false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "giveitasecretkey",
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(false);
    }
    try {
      const user = await User.findByPk(payload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
