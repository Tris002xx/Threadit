const express = require("express");
const router = express.Router();

// Middleware
const { registerUser } = require("../controllers/registerUser");

router.get("/", (req, res) => {
  res.render("pages/signup");
});

router.post("/create", registerUser);

module.exports = router;
