const { User, Post } = require("../database/models");

const loadPosts = async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());
    console.log(posts);
    res.render("pages/index", { posts: posts });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loadPosts };
