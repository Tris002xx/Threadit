const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");

const loadPosts = async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());
    if (isAuthenticated(req)) {
      res.send(200);
      console.log("Logged In");
    } else {
      res.render("pages/index", { posts: posts });
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loadPosts };
