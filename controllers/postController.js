const { User, Post, Comment } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");
const { convertDateFormat } = require("./helpers/convertDateFormat");

const renderPost = async (req, res) => {
  try {
    const postID = req.params.postID;
    const resultPost = await Post.findAll({
      where: { id: postID },
      include: User,
    });

    const resultComments = await Comment.findAll({
      where: { postId: postID },
      include: {
        all: true,
        nested: true,
      },
      order: [["createdAt", "DESC"]],
    });

    const comments = resultComments.map((comment) => comment.toJSON());

    const posts = resultPost.map((post) => post.toJSON());

    for (let post of posts) {
      post.createdAt = convertDateFormat(post.createdAt);
    }

    console.log(posts[0].comments);
    if (isAuthenticated(req)) {
      console.log(comments);
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: req.user,
      });
      console.log("Logged In");
    } else {
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: false,
      });
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

const addComment = async (req, res) => {
  try {
    const { newComment } = req.body;
    const postId = req.params.postID;

    const commentToAdd = {
      text: newComment,
      postId: postId,
      userId: req.user.id,
    };
    await Comment.create(commentToAdd);

    if (isAuthenticated(req)) {
      res.redirect(`/api/post/${postId}`);
      console.log("Logged In");
    } else {
      res.redirect(`/api/post/${postId}`);
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPost, addComment };
