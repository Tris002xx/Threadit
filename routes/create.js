const express = require("express");
const router = express.Router();

// Controllers
const renderCreate = require("../controllers/renderCreate");

// Routes
router.get("/", renderCreate);

module.exports = router;
