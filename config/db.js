// config/db.js
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "defaultdb",
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  }
);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.log("An error occurred:", err));

export default sequelize;
