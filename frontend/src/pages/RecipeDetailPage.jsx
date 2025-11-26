import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetailPage() {
    const { id } = useParams(); // recipeID from URL
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecipe() {
            try {
                // Fetch recipe details
                const recipeRes = await fetch(`http://localhost:4000/api/recipes/${id}`);
                const recipeJson = await recipeRes.json();

                // Normalize fields like your Handlebars expects
                const mappedRecipe = {
                    id: recipeJson.recipeID,
                    title: recipeJson.recipeTitle,
                    photoURL_Path: recipeJson.photoURL_Path,
                    ingredients: recipeJson.ingredients,
                    instructions: recipeJson.instructions,
                    prepTime: recipeJson.prepTimeMins,
                    cookTime: recipeJson.cookTimeMins,
                };

                setRecipe(mappedRecipe);

                // Fetch reviews for this recipe
                const reviewRes = await fetch("http://localhost:4000/api/reviews");
                const reviewsJson = await reviewRes.json();

                const mappedReviews = reviewsJson
                    .filter((r) => r.recipeID === parseInt(id))
                    .map((r) => ({
                        title: r.reviewTitle,
                        rating: r.reviewRating,
                        feedback: r.reviewText,
                    }));

                setReviews(mappedReviews);
            } catch (err) {
                console.error("Error loading recipe:", err);
            } finally {
                setLoading(false);
            }
        }

        loadRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <p>Loading recipe...</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container mt-5">
                <p>Recipe not found.</p>
                <Link className="btn btn-outline-secondary" to="/">
                    Back
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <Link to="/" className="btn btn-outline-secondary mb-3">
                &larr; Back
            </Link>

            <h1>{recipe.title}</h1>

            <img
                src={recipe.photoURL_Path}
                className="img-fluid mb-3"
                alt={recipe.title}
            />

            <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
            </p>

            <p>
                <strong>Instructions:</strong> {recipe.instructions}
            </p>

            <p>
                <strong>Prep Time:</strong> {recipe.prepTime} mins
            </p>

            <p>
                <strong>Cook Time:</strong> {recipe.cookTime} mins
            </p>

            <h3 className="mt-4">Reviews</h3>

            <Link className="btn btn-primary mb-3" to={`/create-review/${recipe.id}`}>
                Add Review
            </Link>

            {reviews.length > 0 ? (
                <ul className="list-group mb-5">
                    {reviews.map((rev, i) => (
                        <li className="list-group-item" key={i}>
                            <strong>{rev.title}</strong> ({rev.rating}/10)
                            <p className="mb-0">{rev.feedback}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet. Be the first to add one!</p>
            )}
        </div>
    );
}

export default RecipeDetailPage;
