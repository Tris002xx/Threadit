const { User, Post, Comment, Upvote, Downvote } = require("./models");
const { sequelize } = require("./db");
const bcrypt = require("bcrypt");

const createInstances = async () => {
  try {
    // Drop all tables and recreate them
    await sequelize.sync({ force: true });
    console.log("Database reset and models created");

    // Users
    const tristan = await User.create({
      username: "tris002xx",
      password: await bcrypt.hash("Password", 15),
      name: "Tristan James Torres",
      email: "tristanjames3131@gmail.com",
    });
    const john = await User.create({
      username: "john12",
      password: await bcrypt.hash("Password", 15),
      name: "John Doe",
      email: "john12@gmail.com",
    });

    // Posts
    const firstPost = await Post.create({
      title: "Nested Comments here!",
      text: "Check and see if comments are nesting below!",
      userId: tristan.id,
    });
    const secondPost = await Post.create({
      title: "Where are the washrooms at Metrotown?",
      text: "Can someone please help me find the washrooms at metro?",
      userId: tristan.id,
    });

    // Upvotes and Downvotes
    const firstUpvote = await Upvote.create({
      userId: tristan.id,
      postId: firstPost.id,
    });

    // Nested Comment Examples
    // const firstComment = await Comment.create({
    //   text: "First Comment",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    // });
    // const firstReply = await Comment.create({
    //   text: "First Reply",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    //   parentId: firstComment.id,
    // });

    // const secondReply = await Comment.create({
    //   text: "Second Reply",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    //   parentId: firstComment.id,
    // });

    // const firstReplyTofirstReply = await Comment.create({
    //   text: "First Reply to First Reply",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    //   parentId: firstReply.id,
    // });

    // const secondReplyTosecondReply = await Comment.create({
    //   text: "Second Reply to First Reply",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    //   parentId: firstReply.id,
    // });

    // const secondComment = await Comment.create({
    //   text: "Second Comment",
    //   postId: firstPost.id,
    //   userId: tristan.id,
    // });
  } catch (error) {
    console.error("Error creating instances:", error);
  }
};

createInstances();
