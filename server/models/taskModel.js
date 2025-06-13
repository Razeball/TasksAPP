import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [3],
        msg: "The title is too short",
      },
    },
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: "Empty",
  },
  due_date: {
    type: DataTypes.DATE(3),
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  color: {
    type: DataTypes.ENUM("red", "blue", "green"),
    allowNull: false,
    defaultValue: "red",
  },
});
export default task;
