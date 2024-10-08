const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
require("./middleware/passport");
dotenv.config();

const port = process.env.PORT;
const app = express();

// Config
app.set("view engine", "ejs");

// Default Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true })); // Middleware
app.use(
  session({
    secret: "epicsecert",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const index = require("./routes/index");
const login = require("./routes/login");
const signup = require("./routes/signup");
const create = require("./routes/create");
const post = require("./routes/post");
const comment = require("./routes/comment");
const vote = require("./routes/vote")
app.use("/", index);
app.use("/api/post", post);
app.use("/login", login);
app.use("/signup", signup);
app.use("/create", create);
app.use("/api/comment", comment);
app.use("/api/post/vote", vote);

// App listener
app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});

// Debugging
// app.use((req, res, next) => {
//   console.log(req.session);
//   // console.log("Time:", Date.now());
//   next();
// });
