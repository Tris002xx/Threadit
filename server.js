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
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true })); // Middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Debugging
// app.use((req, res, next) => {
//   console.log(req.session);
//   // console.log("Time:", Date.now());
//   next();
// });

// Routes
const index = require("./routes/index");
app.use("/", index);
const login = require("./routes/login");
app.use("/login", login);
const signup = require("./routes/signup");
app.use("/signup", signup);
const create = require("./routes/create");
app.use("/create", create);

// App listener
app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
