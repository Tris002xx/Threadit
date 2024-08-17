const { Post } = require("../database/models");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");

const renderCreate = (req, res) => {
  if (isAuthenticated(req)) {
    return res.render("pages/create", { user: req.user });
  } else {
    return res.redirect("/");
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
