const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Comment = sequelize.define("comment", {
  text: DataTypes.TEXT,
});

Comment.isHierarchy({
  onDelete: "CASCADE",
});

const User = sequelize.define("user", {
  username: DataTypes.TEXT,
  password: DataTypes.TEXT,
  email: DataTypes.TEXT,
  name: DataTypes.TEXT,
});

const Post = sequelize.define("post", {
  title: DataTypes.TEXT,
  text: DataTypes.TEXT,
});

const Upvote = sequelize.define("upvote", {
});
const Downvote = sequelize.define("downvote", {
});



// Associations
User.hasMany(Post, { as: "posts" });
Post.belongsTo(User);

Post.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Post);

User.hasMany(Comment, { as: "comments" });
Comment.belongsTo(User);

User.hasMany(Upvote, { as: "upvotes" });
Upvote.belongsTo(User);

User.hasMany(Downvote, { as: "downvotes" });
Downvote.belongsTo(User);

Post.hasMany(Upvote, { as: "upvotes" });
Upvote.belongsTo(Post);

Post.hasMany(Downvote, { as: "downvotes" });
Downvote.belongsTo(Post);

Comment.hasMany(Upvote, { as: "upvotes" });
Upvote.belongsTo(Comment);

Comment.hasMany(Downvote, { as: "downvotes" });
Downvote.belongsTo(Comment);


module.exports = { User, Post, Comment, Upvote, Downvote };
