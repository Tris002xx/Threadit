const express = require("express");
const router = express.Router();

// Middleware
const { renderPost, addComment } = require("../controllers/postController");

// Routes
router.get("/:postID/", renderPost);

// Adding comment to post
router.post("/:postID", addComment);


module.exports = router;
