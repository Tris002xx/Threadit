const express = require("express");
const router = express.Router();

// Controllers
const {
  createVote,
  deleteVote
} = require("../controllers/voteController");

// Routes
router.post("/:postId", createVote);
router.delete("/:postId", deleteVote);

module.exports = router;
