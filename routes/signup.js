const express = require("express");
const router = express.Router();

// Controllers
const { registerUser } = require("../controllers/registerUser");
const isAuthenticated = require("../controllers/isAuthenticated");

// Routes
router.get("/", (req, res) => {
  if (isAuthenticated(req)) {
    // res.render("pages/signup", { user: req.user });
    res.redirect("/")
    console.log("Logged In");
  } else {
    res.render("pages/signup", { user: false });
    console.log("Not logged in");
  }
});

router.post("/create", registerUser);

module.exports = router;
