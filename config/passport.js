// Passport conf
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const { User } = require("../database/models");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async function verify(email, password, done) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const passVal = await bcrypt.compare(password, user.password);
      if (!passVal) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => done(null, user));
});
