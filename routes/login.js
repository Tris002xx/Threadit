const express = require("express");
const router = express.Router();

const passport = require("passport");

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
    res.redirect("/");
  }
);

module.exports = router;
