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

    if (!isAuthenticated(req)) {
      console.log("Not logged in");
      return res.redirect("/login");
    } else if (newComment.trim().length !== 0) {
      const commentToAdd = {
        text: newComment,
        postId: postID,
        userId: req.user.id,
        parentId: commentID,
      };
      // Create comment instance
      await Comment.create(commentToAdd);
      console.log("Logged In");
    }
    return res.redirect(`/api/post/${postID}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { createReply };
