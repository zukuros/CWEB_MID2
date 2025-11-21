"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

export default function ReviewListPage() {
  const { recipeId } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`/api/recipes/${recipeId}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err))
  }, [recipeId])

  return (
    <div className="container my-5">
      <h1>Reviews</h1>

      <div className="mb-3">
        <Link to={`/create-review/${recipeId}`} className="btn btn-primary">
          Add New Review
        </Link>
      </div>

      {reviews.length > 0 ? (
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review.id} className="list-group-item">
              <h5>
                {review.title} <small className="text-muted">({review.rating}/10)</small>
              </h5>
              <p className="mb-1">{review.feedback}</p>
              <small className="text-muted">By: {review.nickname}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  )
}
