//API ROUTER IMPORTS
// load-db.js
import { Recipe, Review, db } from '../db.js';

export default async function loadDB() {
    // Sync DB (create tables if they don't exist)
    await db.sync();

    // Check whether there are any recipes already
    const count = await Recipe.count();
    if (count > 0) {
        console.log(`DB already seeded (${count} recipes). Skipping seed.`);
        return;
    }

    // Seed recipes
    const recipes = [
        {
            recipeTitle: 'Classic Spaghetti Carbonara',
            prepTimeMins: 10,
            cookTimeMins: 15,
            ingredients: `200g spaghetti\n100g pancetta or guanciale\n2 large eggs\n50g pecorino romano, grated\n50g parmesan, grated\n2 cloves garlic, peeled\nFreshly ground black pepper\nSalt`,
            instructions: `1. Bring a large pot of salted water to a boil and cook the spaghetti until al dente.\n2. While pasta cooks, fry pancetta with crushed garlic until crisp; remove garlic.\n3. Beat eggs in a bowl and mix with grated cheeses.\n4. Drain pasta, reserving some cooking water.\n5. Toss hot pasta with pancetta and remove from heat; quickly stir in egg+cheese mixture, adding a splash of pasta water to create a creamy sauce.\n6. Season with black pepper and serve immediately.`,
            photoURL_Path: 'https://example.com/images/spaghetti-carbonara.jpg',
        },
        {
            recipeTitle: 'Vegetarian Chickpea Curry',
            prepTimeMins: 15,
            cookTimeMins: 30,
            ingredients: `1 tbsp oil\n1 onion, chopped\n2 garlic cloves, minced\n1 tbsp grated ginger\n1 tbsp curry powder\n1 can chopped tomatoes\n1 can coconut milk\n2 cans chickpeas, drained\nSalt and pepper\nFresh cilantro`,
            instructions: `1. Heat oil and sauté onion until soft.\n2. Add garlic, ginger and curry powder; cook 1 minute.\n3. Stir in tomatoes and coconut milk and bring to a simmer.\n4. Add chickpeas and cook 15-20 minutes until slightly thickened.\n5. Season and garnish with cilantro.`,
            photoURL_Path: 'https://example.com/images/chickpea-curry.jpg',
        },
    ];

    const createdRecipes = [];
    for (const r of recipes) {
        const created = await Recipe.create(r);
        createdRecipes.push(created);
    }

    // Seed reviews for the first recipe
    const reviews = [
        {
            recipeID: createdRecipes[0].recipeID,
            authorName: 'Alex',
            reviewTitle: 'Delicious and Quick',
            reviewText: 'Followed this recipe and it came out creamy and comforting. Will make again!',
            reviewRating: 9,
        },
        {
            recipeID: createdRecipes[0].recipeID,
            authorName: 'Jamie',
            reviewTitle: 'A bit salty for me',
            reviewText: 'Loved the technique, but reduced the pancetta next time to cut saltiness.',
            reviewRating: 7,
        },
    ];

    for (const rv of reviews) {
        await Review.create(rv);
    }

    console.log(`Seeded ${createdRecipes.length} recipes and ${reviews.length} reviews.`);
}