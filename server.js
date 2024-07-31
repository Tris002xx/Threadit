const express = require("express");
const path = require("path");
const { User, Post } = require("./models");

const app = express();
const port = 3000;

// Config
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
