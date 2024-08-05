const isAuthenticated = require("../controllers/helpers/isAuthenticated");
const { User, Comment } = require("../database/models");

const express = require("express");
const router = express.Router();

// Controllers
const { createReply } = require("../controllers/commentController");

// Routes
router.post("/:commentID", createReply);

module.exports = router;
