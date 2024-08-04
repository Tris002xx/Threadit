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
    const postId = req.params.postID;
    const { newComment } = req.body;

    // Can't comment if logged in!
    if (!isAuthenticated(req)) {
      res.redirect("/login");
      console.log("Not logged in");

      // Proceed with POST request
    } else if (newComment.trim().length !== 0) {
      const commentToAdd = {
        text: newComment,
        postId: postId,
        userId: req.user.id,
      };
      // Create comment instance
      await Comment.create(commentToAdd);
      console.log("Logged In");
    }

    res.redirect(`/api/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPost, addComment };
