import { Router } from "express";
import { getAllUsers, registerUser, login } from "./users.controller";

const router = Router();

router.get("/", getAllUsers);

router.post("/register", registerUser);

router.post("/login", login);

export default router;
