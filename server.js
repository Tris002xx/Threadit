const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
dotenv.config();

const port = process.env.PORT;
const app = express();

// Config
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Controllers
const { loadPosts } = require("./controllers/loadPosts");
const { registerUser } = require("./controllers/auth");

// Routes
app.get("/", loadPosts);

app.get("/login", (req, res, next) => {
  console.log(req.session.messages);
  res.render("pages/login");
});


// Passport Routes
app.post(
  "/login/password",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/~" + req.user.username);
  }
);

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
