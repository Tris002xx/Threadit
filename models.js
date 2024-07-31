const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const User = sequelize.define("user", {
  username: DataTypes.TEXT,
  password: DataTypes.TEXT,
  name: DataTypes.TEXT,
});

const Post = sequelize.define("post", {
  title: DataTypes.TEXT,
  text: DataTypes.TEXT,
});

User.hasMany(Post, { as: "posts" }); // User has many Posts
Post.belongsTo(User); // Post belongs to a User

module.exports = { User, Post };
