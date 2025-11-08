import "dotenv/config";
import connectDB from "./src/db/index.ts";
import app from "./src/app.ts";
import { config } from "./src/config/config.ts";

const PORT = config.PORT || 3000;

connectDB()
  .then(() => {
    process.on("uncaughtException", (error) => {
      console.log(`Uncaught Exception: ${error}`);
    });
    process.on("unhandledRejection", (error) => {
      console.log(`Unhandled Rejection: ${error}`);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`DB Connection Failed: ${err}`);
  });
