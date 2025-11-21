"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function RecipeDetailPage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error(err))

    fetch(`/api/recipes/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err))
  }, [id])

  if (!recipe) return <div className="container mt-5">Loading...</div>

  return (
    <div className="container">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        &larr; Back
      </Link>
      <h1>{recipe.title}</h1>
      <img src={recipe.photoURL_Path || "/placeholder.svg"} className="img-fluid mb-3" alt={recipe.title} />
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

      <h3>Reviews</h3>
      <Link className="btn btn-primary" to={`/create-review/${recipe.id}`}>
        Add Review
      </Link>
      {reviews.length > 0 ? (
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review.id} className="list-group-item">
              <strong>{review.title}</strong> ({review.rating}/10)
              <p>{review.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  )
}
