import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    url: process.env.DB_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DB_URL,
    dialect: "postgres",
  },
};
