const express = require("express");
const router = express.Router();

const { renderPost } = require("../controllers/postController");

router.get("/:postID", renderPost);

module.exports = router;
