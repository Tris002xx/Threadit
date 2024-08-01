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


module.exports = router;
