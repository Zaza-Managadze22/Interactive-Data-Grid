import { sequelize } from "./models"; // Adjust the import path as necessary
import { User, UserAttributes } from "./models/user"; // Adjust the import path as necessary
import { Recipe, RecipeAttributes } from "./models/recipe"; // Adjust the import path as necessary

interface UserApiResponse {
  users: UserAttributes[];
}

interface RecipeApiResponse {
  recipes: {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    cookTimeMinutes: number;
    tags: string[];
    userId: number;
    image: string;
  }[];
}

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Sync database
    console.log("Database synced successfully!");

    const users: UserAttributes[] = await fetch(
      `https://dummyjson.com/users?select=id,firstName,lastName,image&limit=1000`
    )
      .then((response) => response.json())
      .then((jsonResponse: UserApiResponse) => jsonResponse.users)
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        throw error;
      });

    await User.bulkCreate(users);
    console.log("Users seeded successfully!");

    const recipes: RecipeAttributes[] = await fetch(
      `https://dummyjson.com/recipes?select=id,name,ingredients,instructions,cookTimeMinutes,tags,userId,image&limit=1000`
    )
      .then((response) => response.json())
      .then((jsonResponse: RecipeApiResponse) =>
        jsonResponse.recipes.map((recipe) => ({
          ...recipe,
          tag: recipe.tags[0],
          userIds: [recipe.userId],
        }))
      )
      .catch((error) => {
        console.error("Failed to fetch recipes:", error);
        throw error;
      });

    await Recipe.bulkCreate(recipes);
    console.log("Recipes seeded successfully!");
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
}

seed();
