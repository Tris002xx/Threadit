const isAuthenticated = require("./isAuthenticated");
const { User, Post } = require("../database/models");

const renderCreate = (req, res) => {
  if (isAuthenticated(req)) {
    res.render("pages/create", { user: req.user });
    console.log("Logged In");
  } else {
    res.redirect("/");
    console.log("Not logged in");
  }
};

const processCreate = async (req, res) => {
  try {
    const { title, text } = req.body;
    const userExists = req.user.id;
    await Post.create({
      title,
      text,
      userId: userExists,
    });
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error in registering user");
  }
};

module.exports = { renderCreate, processCreate };
