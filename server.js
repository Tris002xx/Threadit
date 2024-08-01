const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { User, Post } = require("./database/models");

const port = process.env.PORT
const app = express();

// Config
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());
    console.log(posts);
    res.render("pages/index", { posts: posts });
  } catch (error) {
    console.error(error);
  }
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
