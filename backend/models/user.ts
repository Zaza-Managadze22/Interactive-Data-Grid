import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number; // Primary Key
  firstName: string;
  lastName: string;
  image: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserFactory(sequelize: Sequelize) {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );
}
