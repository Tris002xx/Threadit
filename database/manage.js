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
      title: "Whats your first bad experience after getting a driving license?",
      text: "So I just got my license yesterday and I went driving around my place to get a feeling of it. It all went smooth until I accidentally hit someone side mirror who park on the side. The owner didnt ask for much and I thank them for that but my self esteem do went down after that. My skill kinda drop as I feel like I will hit something again. So can somebody tell a stories after they got their license so I can feel like its normal to do some stupid stuff first and probably use as my lesson for future driving.",
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
