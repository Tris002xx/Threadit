const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../controllers/isAuthenticated");

// Routes
router.get("/", (req, res) => {
  if (isAuthenticated(req)) {
    // res.render("pages/login", { user: req.user });
    res.redirect("/");
    console.log("Logged In");
  } else {
    res.render("pages/login", { user: false });
    console.log("Not logged in");
  }
});

router.post(
  "/password",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
