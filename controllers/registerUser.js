const { User } = require("../database/models");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;
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
      email,
      username,
      name,
      password: await bcrypt.hash(password, 15),
    });
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error in registering user");
  }
};

module.exports = { registerUser };
