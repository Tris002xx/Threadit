const express = require("express");
const router = express.Router();

// Controllers
const {
  renderCreate,
  processCreate,
} = require("../controllers/createController");

// Routes
router.get("/", renderCreate);

router.post("/post", processCreate);
module.exports = router;
