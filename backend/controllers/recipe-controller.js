// controllers/recipe-controller.js
import { Recipe } from "../db.js";

/**
 * GET /api/recipes
 */
export async function getAllRecipes(req, res, next) {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (err) {
        next(err);
    }
}

export async function createRecipe(req, res, next) {
    try {
        const {
            recipeTitle,
            prepTimeMins,
            cookTimeMins,
            ingredients,
            instructions,
            photoURL_Path
        } = req.body;

        if (!recipeTitle || !ingredients || !instructions) {
            return res.status(400).json({
                error: 'Missing required fields: recipeTitle, ingredients, instructions'
            });
        }

        const created = await Recipe.create({
            recipeTitle,
            prepTimeMins: prepTimeMins || 0,
            cookTimeMins: cookTimeMins || 0,
            ingredients,
            instructions,
            photoURL_Path: photoURL_Path || ''
        });

        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}
