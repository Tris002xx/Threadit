const express = require("express");
const router = express.Router();

// Middleware
const { renderPost } = require("../controllers/postController");

// Routes
router.get("/:postID", renderPost);

module.exports = router;
