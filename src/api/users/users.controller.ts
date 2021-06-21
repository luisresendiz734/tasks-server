import { genSalt, hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "./users.model";

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);

  return hashed;
};

export const comparePassword = async (password: string, hashed: string) => {
  return compare(password, hashed);
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({
      attributes: ["id", "name", "email", "password"],
    });
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      status: false,
      error: "Name, email and password are required.",
    });
    return;
  }

  try {
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      res.status(400).json({
        status: false,
        error: "User with this email already exists.",
      });
      return;
    }

    const hashed = await encryptPassword(password);
    const result = await User.create({
      id: nanoid(10),
      name,
      email,
      password: hashed,
    });
    res.json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const result = await User.findOne({ where: { email } });
    if (!result) {
      res
        .status(400)
        .json({ status: false, error: "User with this email not found." });
      return;
    }

    const validPass = await comparePassword(
      password,
      result.getDataValue("password")
    );
    if (validPass) {
      res.json({ status: true, result });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
