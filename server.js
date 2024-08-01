const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const { User, Post } = require("./database/models");

const port = process.env.PORT;
const app = express();

// Config
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));

// auth sign up
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email exists
    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .send("Email is already associated with an account");
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 15),
    });
    return res.status(200).send("Registration successful");
  } catch (err) {
    return res.status(500).send("Error in registering user");
  }
};

// auth log in
const signInUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json("Email not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send("Sign in error");
  }
};

// Routes
app.get("/", async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());
    console.log(posts);
    res.render("pages/index", { posts: posts });
  } catch (error) {
    console.error(error);
  }
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/login", signInUser);

app.listen(port, () => {
  console.log(`Threadit App listening on port http://localhost:${port}/`);
});
