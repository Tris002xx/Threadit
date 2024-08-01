const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
require("./config/passport");
dotenv.config();

const port = process.env.PORT;
const app = express();

// Config
app.set("view engine", "ejs");

// Default Middleware
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const main = require("./routes/main");
app.use("/", main);
const login = require("./routes/login");
app.use("/login", login);

// App listener
app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
