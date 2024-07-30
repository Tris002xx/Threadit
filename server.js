const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Config
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
