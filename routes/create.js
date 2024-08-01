const express = require("express");
const router = express.Router();
const isAuthenticated = require("../controllers/isAuthenticated")

// Routes
router.get("/", (req, res) => {
  if (isAuthenticated(req)) {
    res.render("pages/create", { user: req.user });
    console.log("Logged In");
  } else {
    res.render("pages/create", { user: false });
    console.log("Not logged in");
  }
});

module.exports = router;
