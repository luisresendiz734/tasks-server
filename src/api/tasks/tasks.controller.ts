import { Request, Response } from "express";
import { nanoid } from "nanoid";
import Task from "./tasks.model";

export const getTasksByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new Error("The user id is required.");
    }
    const result = await Task.findAll({
      where: {
        userId,
      },
    });

    res.json({ status: true, result });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { userId, text } = req.body;
  try {
    if (!userId || !text) {
      throw new Error("User id and task are required.");
    }

    const result = await Task.create({
      id: nanoid(10),
      text,
      userId,
      completed: false,
    });

    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: 400, error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id, text, completed } = req.body;
  try {
    if (!id || (!text && completed === undefined)) {
      throw new Error("Task id and modifications are required.");
    }
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("Task with this id does not exist.");
    }

    const result = await task.update({
      text: text || task.getDataValue("text"),
      completed:
        completed !== undefined ? completed : task.getDataValue("completed"),
    });

    res.json({ status: true, result });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};
