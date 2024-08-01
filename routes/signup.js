const express = require("express");
const router = express.Router();

// Controllers
const {
  renderSignup,
  registerUser,
} = require("../controllers/signupController");

// Routes
router.get("/", renderSignup);
router.post("/create", registerUser);

module.exports = router;
