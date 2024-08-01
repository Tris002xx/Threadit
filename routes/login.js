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

// Routes
router.get("/", (req, res) => {
  res.render("pages/login");
});

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
