"use client"

import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

export default function CreateReviewPage() {
  const { recipeId } = useParams()
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    feedback: "",
    nickname: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/create-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recipeId }),
      })
      if (res.ok) {
        navigate(`/recipes/${recipeId}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="col-md-8 col-lg-6 mx-auto bg-white p-4 rounded shadow-sm">
      <h1>Add Review</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label fw-semibold">
            Rating (1–10)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="form-control"
            min="1"
            max="10"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="feedback" className="form-label fw-semibold">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="nickname" className="form-label fw-semibold">
            Nickname (optional)
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
        <Link to={`/recipes/${recipeId}`} className="btn btn-secondary ms-2">
          Back to Reviews
        </Link>
      </form>
    </div>
  )
}
