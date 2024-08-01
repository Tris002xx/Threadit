const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const app = express();

// Config
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
const { loadPosts } = require("./controllers/loadPosts");
const { registerUser, signInUser } = require("./controllers/auth");

// Routes
app.get("/", loadPosts);

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/login", signInUser);

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
