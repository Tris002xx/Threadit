const { Sequelize } = require("sequelize");
require("sequelize-hierarchy-next")(Sequelize);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/database.sqlite",
});

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// testDatabase();

module.exports = { sequelize };
