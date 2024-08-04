const express = require("express");
const router = express.Router();

// Controllers
const {
  renderLogin,
  authenticateLogin,
  redirect,
  logOutCurrentUser,
} = require("../controllers/loginController");

// Routes
router.get("/", renderLogin);
router.post("/password", authenticateLogin, redirect);
router.get("/logout", logOutCurrentUser);
module.exports = router;
