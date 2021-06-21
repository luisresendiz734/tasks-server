import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

export interface ITask {
  id: string;
  text: string;
  userId: string;
  completed: boolean;
}

const Task = sequelize.define<Model<ITask>>(
  "tasks",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Task;
