const { User, Post } = require("./models");
const { sequelize } = require("./db");
const bcrypt = require("bcrypt");

const createInstances = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Created Models");

    const tristan = await User.create({
      username: "tris002xx",
      password: await bcrypt.hash("Password", 15),
      name: "Tristan James Torres",
      email: "tristanjames3131@gmail.com",
    });
    const john = await User.create({
      username: "john12",
      password: await bcrypt.hash("Password", 15),
      name: "John Doe",
      email: "john12@gmail.com",
    });

    const firstPost = await Post.create({
      title:
        "Wisdom teeth removal. Only have $500 worth of coverage so would have to pay $2500 out of pocket. what are my options?",
      text: "I went to see my dentist today and she strongly recommended getting my wisdom teeth removed since they are very difficult to get to and are at risk of getting cavities and other things since they r only half erupted. how can i possibly get them removed without having to pay out of pocket? are there any programs? or clinics? i feel extremely helpless lol",
      userId: tristan.id,
    });

    const secondPost = await Post.create({
      title: "Where are the washrooms at Metrotown?",
      text: "Can someone please help me find the washrooms at metro?",
      userId: tristan.id,
    });
  } catch (error) {
    console.error("Error creating instances:", error);
  }
};
createInstances();
