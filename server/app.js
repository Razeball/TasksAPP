import express from "express";
import env from "./config/config.js";
import authRouter from "./routes/auth.js";
import passport from "passport";
import cors from "cors";
//To allow the autentication to work
import "./middlewares/passport.js";
import taskRouter from "./routes/taskRoutes.js";
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
//use the routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
export default app;
