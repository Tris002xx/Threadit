const { User, Post, Comment } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");
const { convertDateFormat } = require("./helpers/convertDateFormat");
const { timeAgo } = require("./helpers/timeAgo");

const renderPost = async (req, res) => {
  try {
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

    const processComments = async (comments) => {
      for (let comment of comments) {
        comment.dataValues.createdAt = await timeAgo(comment.createdAt);
        if (comment.children) {
          await processComments(comment.children);
        }
      }
    };

    for (let comment of comments) {
      comment.createdAt = await timeAgo(comment.createdAt);
      if (comment.children) {
        await processComments(comment.children);
      }
    }

    if (isAuthenticated(req)) {
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: req.user,
        replied: req.query.replied,
      });
    } else {
      res.render("pages/currentpost", {
        posts: posts,
        comments: comments,
        user: false,
        replied: req.query.replied,
      });
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
      return res.redirect(`/api/post/${postId}`);
    }

    // Can't comment if logged in!
    if (!isAuthenticated(req)) {
      return res.redirect("/login");
    } else if (newComment.trim().length !== 0) {
      const commentToAdd = {
        text: newComment,
        postId: postId,
        userId: req.user.id,
      };
      // Create comment instance
      const addedComment = await Comment.create(commentToAdd);
      return res.redirect(`/api/post/${postId}?replied=${addedComment.id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { renderPost, addComment };
