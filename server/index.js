import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    sequelize.authenticate();
    app.listen(process.env.PORT || 3000, () => {
      console.log("SERVER LISTENING ON PORT: ", process.env.PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
