import { Router } from "express";
import { createTask, getTasksByUserId, updateTask } from "./tasks.controller";

const router = Router();

router.get("/:userId", getTasksByUserId);

router.post("/", createTask);

router.put("/", updateTask);

export default router;
