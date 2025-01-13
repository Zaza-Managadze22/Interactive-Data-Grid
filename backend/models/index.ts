import { Sequelize } from "sequelize";
import path from "path";
import { UserFactory } from "./user";
import { RecipeFactory } from "./recipe";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database.sqlite"),
  logging: false, // Disable logging in production
});

// Initialize models
const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);

export { sequelize, User, Recipe };
