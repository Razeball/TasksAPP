import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import task from "./taskModel.js";
const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: [3],
          msg: "The user must be at least 3 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      validate: {
        len: {
          args: [8],
          msg: "The password must be at least 8 characters long",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      afterCreate: (user, options) => {
        console.log(`The user ${user.email} has been succesfully created`);
      },
    },
  }
);
user.hasMany(task, {
  foreignKey: "user_id",
  sourceKey: "id",
});
task.belongsTo(user, {
  foreignKey: "user_id",
  targetId: "id",
});

export default user;
