import { DataTypes, Model, Sequelize } from "sequelize";

export interface RecipeAttributes {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTimeMinutes: number;
  tag: string;
  userIds: number[]; // Foreign Key array
  image: string;
}

export class Recipe
  extends Model<RecipeAttributes>
  implements RecipeAttributes
{
  public id!: number;
  public name!: string;
  public ingredients!: string[];
  public instructions!: string[];
  public cookTimeMinutes!: number;
  public tag!: string;
  public userIds!: number[];
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RecipeFactory(sequelize: Sequelize) {
  return Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.JSON, // Use JSON for array-like structures
        allowNull: false,
      },
      instructions: {
        type: DataTypes.JSON, // Use JSON for array-like structures
        allowNull: false,
      },
      cookTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userIds: {
        type: DataTypes.JSON, // Store array of user IDs as JSON
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, // Store URL or path to the image
        allowNull: false,
      },
    },
    {
      tableName: "recipes",
      sequelize,
    }
  );
}
