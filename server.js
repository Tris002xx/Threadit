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
    const result = await Post.findAll();
    const posts = result.map((post) => post.toJSON());

    for (const post of posts) {
      const r = await User.findByPk(post.userId);
      const person = r.toJSON();
      post.user = person.name;
    }

    res.render("pages/index", { posts: posts });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
