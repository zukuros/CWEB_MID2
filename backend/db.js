//db.js
// Purpose: Set up the database connection and define models and their relationships
import { Sequelize } from 'sequelize';

// model files export an unnamed function - when we import we declare a name for the function
import RecipeModel from './models/recipe.js';
import ReviewModel from './models/review.js';

//used to export the database to file and accept connection
export const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

//Create "Repository" from the Model and database connection
//Each Repository contains several methods that connect to the specific database table
export const Recipe = RecipeModel(db);
export const Review = ReviewModel(db);


// Relationships
Recipe.hasMany(Review, { foreignKey: 'recipeID', onDelete: 'CASCADE' });
Review.belongsTo(Recipe, { foreignKey: 'recipeID' });

