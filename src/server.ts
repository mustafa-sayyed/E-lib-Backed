import "dotenv/config";
import connectDB from "./db/index.ts";
import app from "./app.ts";

const PORT = process.env.PORT || 3000;

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
