// models/Trains.js
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Adjust the path as necessary

const Trains = sequelize.define(
  "Trains",
  {
    train_no: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    train_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    },
  },
  {
    tableName: "trains",
    timestamps: false,
  }
);

export default Trains;
