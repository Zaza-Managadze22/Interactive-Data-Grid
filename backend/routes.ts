import { Request, Response, Router } from "express";
import { Recipe, User } from "./models"; // Adjust the import path as necessary
import { UserAttributes } from "./models/user";
import { Op } from "sequelize";

const router = Router();

// API endpoint for querying users by first and last name
router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q);
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// API endpoint for fetching recipes
router.get("/api/recipes", async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.pageSize ?? 10);
    const page = Number(req.query.page ?? 0);
    const offset = page * limit;

    const { count, rows } = await Recipe.findAndCountAll({
      limit,
      offset,
    });

    const uniqueUserIds = new Set<number>();
    for (const row of rows) {
      for (const id of row.dataValues.userIds) {
        uniqueUserIds.add(id);
      }
    }

    const userIds = [...uniqueUserIds];
    const users = await User.findAll({ where: { id: userIds } });
    const usersById: { [key: number]: UserAttributes } = {};
    for (const user of users) {
      usersById[user.id] = user.toJSON();
    }

    const RecipeWithUsers = rows.map((row) => ({
      ...row.toJSON(),
      users: row.userIds.map((id) => usersById[id]),
    }));

    res.json({ total: count, data: RecipeWithUsers });
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// API endpoint for updating a recipe
router.put("/api/recipes/:id", async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.id;
    const { name, tag, cookTimeMinutes, users } = req.body;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Update the recipe with the new data
    await recipe.update({
      name,
      tag,
      cookTimeMinutes,
      userIds: users.map((user: UserAttributes) => user.id),
    });

    res.json({
      ...recipe.toJSON(),
      users,
    });
  } catch (error) {
    console.error("Failed to update recipe:", error);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

export default router;
