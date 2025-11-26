import { Link } from "react-router-dom"

export default function ReviewList({ reviews, recipeId }) {
  return (
    <div className="mt-4">
      <h3>Reviews</h3>
      <Link to={`/create-review/${recipeId}`} className="btn btn-primary mb-3">
        Add Review
      </Link>

      {reviews && reviews.length > 0 ? (
        <ul className="list-group">
          {reviews.map((review, idx) => (
            <li key={idx} className="list-group-item">
              <h5>
                {review.title} <small className="text-muted">({review.rating}/10)</small>
              </h5>
              <p className="mb-1">{review.feedback}</p>
              {review.nickname && <small className="text-muted">By: {review.nickname}</small>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  )
}
