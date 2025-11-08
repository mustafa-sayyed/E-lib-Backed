import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

// Routes Declaration
import errorHandler from "./middlewares/errorHandler.middeware.ts";
import userRouter from "./routes/user.route.ts";


app.use("/api/v1/users", userRouter);


app.get("/", cors(), (req, res) => {
  res.json({ message: "Medify Backend is Working..." });
});


// Global Error Handler Middleware
app.use(errorHandler);

export default app;
