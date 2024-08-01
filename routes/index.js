const express = require("express");
const router = express.Router();

// Controllers
const { renderPosts } = require("../controllers/indexController");

// Routes
router.get("/", renderPosts);

module.exports = router;
