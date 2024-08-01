const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");

const renderPosts = async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());
    if (isAuthenticated(req)) {
      res.render("pages/index", { posts: posts, user: req.user });
      console.log("Logged In");
    } else {
      res.render("pages/index", { posts: posts, user: false });
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPosts };
