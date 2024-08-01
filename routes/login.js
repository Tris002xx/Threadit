const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");

// Middleware
router.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
router.use(passport.initialize());
router.use(passport.session());

// Controllers
const { registerUser } = require("../controllers/auth");

// Routes
router.get("/", (req, res, next) => {
  res.render("pages/login");
});

// Passport Routes
router.post(
  "/password",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/~" + req.user.username);
  }
);

module.exports = router;
