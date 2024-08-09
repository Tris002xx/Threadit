const { User, Post, Comment } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");
const { convertDateFormat } = require("./helpers/convertDateFormat");

const renderPost = async (req, res) => {
  try {
    console.log(req.query.replied);
    let replied = false;
    if (req.query.replied) {
      replied = req.query.replied;
    }
    const postID = req.params.postID;
    const resultPost = await Post.findAll({
      where: { id: postID },
      include: User,
    });
    const resultComments = await Comment.findAll({
      hierarchy: true,
      where: { postId: postID },
      include: [
        {
          model: User, // Specify the related model here
          as: "user", // Optionally specify an alias if needed
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const posts = resultPost.map((post) => post.toJSON());
    const comments = resultComments.map((comment) => comment.toJSON());
    for (let post of posts) {
      post.createdAt = convertDateFormat(post.createdAt);
    }

    if (isAuthenticated(req)) {
      console.log(comments);
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: req.user,
        replied: req.query.replied,
      });
      console.log("Logged In");
    } else {
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: false,
        replied: req.query.replied,
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
    if (!newComment) {
      return res.redirect(`/api/post/${postId}`)
    }

    // Can't comment if logged in!
    if (!isAuthenticated(req)) {
      console.log("Not logged in");
      return res.redirect("/login");
    } else if (newComment.trim().length !== 0) {
      const commentToAdd = {
        text: newComment,
        postId: postId,
        userId: req.user.id,
      };
      // Create comment instance
      const addedComment = await Comment.create(commentToAdd);
      console.log("Logged In");
      return res.redirect(`/api/post/${postId}?replied=${addedComment.id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { renderPost, addComment };
