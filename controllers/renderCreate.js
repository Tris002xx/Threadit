const isAuthenticated = require("./isAuthenticated");

const renderCreate = (req, res) => {
  if (isAuthenticated(req)) {
    res.render("pages/login", { user: req.user });
    console.log("Logged In");
  } else {
    res.redirect("/");
    console.log("Not logged in");
  }
};

module.exports = renderCreate;
