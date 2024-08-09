const { User, Post } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");
const { timeAgo } = require("./helpers/timeAgo");

const renderPosts = async (req, res) => {
  try {
    const result = await Post.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    const posts = result.map((post) => post.toJSON());

    for (let post of posts) {
      console.log(post.createdAt);
      post.createdAt = await timeAgo(post.createdAt);
    }
    console.log(posts);

    if (isAuthenticated(req)) {
      console.log("Logged In");
      return res.render("pages/index", { posts: posts, user: req.user });
    } else {
      console.log("Not logged in");
      return res.render("pages/index", { posts: posts, user: false });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPosts };
