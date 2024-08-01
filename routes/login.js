const express = require("express");
const router = express.Router();

// Controllers
const {
  renderLogin,
  authenticateLogin,
} = require("../controllers/loginController");

// Routes
router.get("/", renderLogin);

router.post("/password", authenticateLogin, (req, res) => {
  res.redirect("/");
});

module.exports = router;
