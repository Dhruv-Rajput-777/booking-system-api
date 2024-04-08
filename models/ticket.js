import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Trains from "./trains.js";
import User from "./user.js";

const Ticket = sequelize.define(
  "Ticket",
  {
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    train_no: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Trains,
        key: "train_no",
      },
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "contact_number",
      },
    },
  },
  {
    tableName: "tickets",
    timestamps: false,
  }
);

// Define associations
Ticket.belongsTo(Trains, { foreignKey: "train_no" });
Trains.hasMany(Ticket, { foreignKey: "train_no" });

Ticket.belongsTo(User, { foreignKey: "contact_number" });
User.hasMany(Ticket, { foreignKey: "contact_number" });

export default Ticket;
