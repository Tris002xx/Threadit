const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");


// Helpers
const { convertDateFormat } = require("./helpers/convertDateFormat");

const renderPost = async (req, res) => {
  try {
    const postID = req.params.postID;
    const result = await Post.findAll({
      where: { id: postID },
      include: User,
    });
    const posts = result.map((post) => post.toJSON());

    for (let post of posts) {
      post.createdAt = convertDateFormat(post.createdAt);
    }

    if (isAuthenticated(req)) {
      res.render("pages/currentpost", { posts: posts, user: req.user });
      console.log("Logged In");
    } else {
      res.render("pages/currentpost", { posts: posts, user: false });
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPost };
