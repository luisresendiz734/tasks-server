import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./api/users/users.router";
import tasksRouter from "./api/tasks/tasks.router";

const app = express();

app.set("port", process.env.PORT || 4001);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

export default app;
