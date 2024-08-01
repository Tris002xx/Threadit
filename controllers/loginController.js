const isAuthenticated = require("./isAuthenticated");
const passport = require("passport");

const renderLogin = (req, res) => {
  if (isAuthenticated(req)) {
    // res.render("pages/login", { user: req.user });
    res.redirect("/");
    console.log("Logged In");
  } else {
    res.render("pages/login", { user: false });
    console.log("Not logged in");
  }
};

const authenticateLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
});

const redirect = (req, res) => {
  res.redirect("/");
};

module.exports = { renderLogin, authenticateLogin, redirect };
