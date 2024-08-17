const { User, Post, Upvote, Downvote } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");
const { timeAgo } = require("./helpers/timeAgo");

const renderPosts = async (req, res) => {
  try {
    const result = await Post.findAll({
      include: [User, "upvotes", "downvotes"],
      order: [["createdAt", "DESC"]],
    });
    const posts = result.map((post) => post.toJSON());

    for (let post of posts) {
      post.createdAt = await timeAgo(post.createdAt);
    }

    if (isAuthenticated(req)) {
      return res.render("pages/index", { posts: posts, user: req.user });
    } else {
      return res.render("pages/index", { posts: posts, user: false });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPosts };
