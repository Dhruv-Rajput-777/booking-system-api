// config/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "defaultdb",
  "avnadmin",
  "AVNS_vCW_O1WK1jHUZXWLERr",
  {
    host: "booking-service-ticket-booking-app.a.aivencloud.com",
    dialect: "mysql",
    port: 12253,
  }
);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.log("An error occurred:", err));

export default sequelize;
