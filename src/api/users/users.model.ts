import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const User = sequelize.define<Model<IUser>>(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default User;
