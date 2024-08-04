const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

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

const Comment = sequelize.define("comment", {
  text: DataTypes.TEXT,
});

// Associations
User.hasMany(Post); // User has many Posts
Post.belongsTo(User); // Post belongs to a User

Post.hasMany(Comment); // Post has many comments
Comment.belongsTo(Post); // Comment belongs to a Post

User.hasMany(Comment); // User has many comments
Comment.belongsTo(User); // Comment belongs to a User

Comment.hasMany(Comment);
Comment.belongsTo(Comment); // Comment belongs to a Comment
module.exports = { User, Post, Comment };
