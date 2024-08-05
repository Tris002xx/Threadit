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

// Associations
User.hasMany(Post, { as: "posts" }); // User has many Posts
Post.belongsTo(User); // Post belongs to a User

Post.hasMany(Comment, { as: "comments" }); // Post has many comments
Comment.belongsTo(Post); // Comment belongs to a Post

User.hasMany(Comment, { as: "comments" }); // User has many comments
Comment.belongsTo(User); // Comment belongs to a User

module.exports = { User, Post, Comment };
