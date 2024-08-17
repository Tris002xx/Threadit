const { Comment } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");

const createReply = async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const { newComment } = req.body;

    const resultComment = await Comment.findByPk(commentID);
    const comment = resultComment.toJSON();
    const postID = comment.postId;
    if (!newComment) {
      return res.redirect(`/api/post/${postID}`);
    }
    if (!isAuthenticated(req)) {
      return res.redirect("/login");
    } else if (newComment.trim().length !== 0) {
      const commentToAdd = {
        text: newComment,
        postId: postID,
        userId: req.user.id,
        parentId: commentID,
      };
      // Create comment instance
      const addedComment = await Comment.create(commentToAdd);
      return res.redirect(`/api/post/${postID}?replied=${addedComment.id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { createReply };
