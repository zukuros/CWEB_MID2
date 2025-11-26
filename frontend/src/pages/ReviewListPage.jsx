import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecipes() {
            try {
                const res = await fetch("http://localhost:4000/api/recipes");
                const data = await res.json();

                // Match Handlebars naming (id, title, photoURL_Path)
                const mapped = data.map((r) => ({
                    id: r.recipeID,
                    title: r.recipeTitle,
                    photoURL_Path: r.photoURL_Path,
                }));

                setRecipes(mapped);
            } catch (err) {
                console.error("Failed to load recipes", err);
            } finally {
                setLoading(false);
            }
        }

        loadRecipes();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <p>Loading recipes...</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="row">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

export default RecipeListPage;
