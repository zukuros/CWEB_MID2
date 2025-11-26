// routes/recipe-api.js
import express from 'express';
import { createRecipe, getAllRecipes } from '../controllers/recipe-controller.js';

const router = express.Router();
const apiPath = '/recipes';

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: Returns all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeTitle
 *               - ingredients
 *               - instructions
 *             properties:
 *               recipeTitle:
 *                 type: string
 *               prepTimeMins:
 *                 type: integer
 *               cookTimeMins:
 *                 type: integer
 *               ingredients:
 *                 type: string
 *               instructions:
 *                 type: string
 *               photoURL_Path:
 *                 type: string
 *     responses:
 *       201:
 *         description: The recipe that was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
router.get(apiPath, getAllRecipes);
router.post(apiPath, createRecipe);

export default router;
