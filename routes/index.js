const express = require("express");
const router = express.Router();

// Controllers
const { loadPosts } = require("../controllers/loadPosts");

// Routes
router.get("/", loadPosts);

module.exports = router;
