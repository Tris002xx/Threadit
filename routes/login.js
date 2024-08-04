const express = require("express");
const router = express.Router();

// Controllers
const {
  renderLogin,
  authenticateLogin,
  redirect,
} = require("../controllers/loginController");

// Routes
router.get("/", renderLogin);
router.post("/password", authenticateLogin, redirect);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
