import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks", "root", "root", {
  host: "localhost",
  dialect: "mariadb",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected...");
  } catch (error) {
    console.log("DB Error: ", error);
  }
};

export { connectDB, sequelize };
