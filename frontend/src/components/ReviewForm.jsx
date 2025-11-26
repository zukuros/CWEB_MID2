"use client"

import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function ReviewForm() {
  const { recipeId } = useParams()
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    feedback: "",
    nickname: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const payload = {
        recipeID: Number.parseInt(recipeId),
        authorName: formData.nickname || null,
        reviewTitle: formData.title,
        reviewText: formData.feedback,
        reviewRating: Number.parseInt(formData.rating),
      }

      if (!payload.recipeID || !payload.reviewTitle || !payload.reviewText || !payload.reviewRating) {
        throw new Error("Missing required review fields")
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to create review")

      navigate(`/recipes/${recipeId}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <div className="col-md-8 col-lg-6 mx-auto bg-white p-4 rounded shadow-sm">
        <Link to={`/recipes/${recipeId}`} className="btn btn-outline-secondary mb-3">
          ← Back to Reviews
        </Link>

        <h2 className="text-center mb-4 fw-bold">Add Review</h2>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Review Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter review title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label fw-semibold">
              Rating (1–10)
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              min="1"
              max="10"
              placeholder="Enter rating"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="feedback" className="form-label fw-semibold">
              Your Feedback
            </label>
            <textarea
              className="form-control"
              id="feedback"
              name="feedback"
              placeholder="Enter your review"
              rows="3"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nickname" className="form-label fw-semibold">
              Nickname (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="nickname"
              name="nickname"
              placeholder="Enter your name"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
