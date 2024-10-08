const passport = require("passport");

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated");

const renderLogin = (req, res) => {
  if (isAuthenticated(req)) {
    res.redirect("/");
  } else {
    res.render("pages/login", { user: false });
  }
};

const authenticateLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
});

const redirect = (req, res) => {
  res.redirect("/");
};

const logOutCurrentUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  renderLogin,
  authenticateLogin,
  redirect,
  logOutCurrentUser,
};
