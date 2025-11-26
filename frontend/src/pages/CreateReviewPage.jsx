// src/pages/CreateReviewPage.jsx
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function CreateReviewPage()
{
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event)
  {
    event.preventDefault()
    setError('')

    const payload =
        {
          recipeID: recipeId,
          authorName: nickname || null,
          reviewTitle: title,
          reviewText: feedback,
          reviewRating: rating ? parseInt(rating, 10) : null
        }

    if (!payload.recipeID || !payload.reviewTitle || !payload.reviewText || !payload.reviewRating)
    {
      setError('Please fill out all required fields.')
      return
    }

    try
    {
      setIsSubmitting(true)

      const response = await fetch('http://localhost:4000/api/reviews',
          {
            method: 'POST',
            headers:
                {
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify(payload)
          })

      if (!response.ok)
      {
        const text = await response.text()
        throw new Error(text || 'Failed to create review')
      }

      await response.json()
      navigate(`/recipes/${recipeId}`)
    }
    catch (err)
    {
      setError(err.message || 'Failed to create review')
    }
    finally
    {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="container my-5">
        <div className="col-md-8 col-lg-6 mx-auto bg-white p-4 rounded shadow-sm">
          <h1 className="mb-4">Add Review</h1>

          {error && (
              <div className="alert alert-danger">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            {/* Hidden recipeId */}
            <input type="hidden" name="recipeId" value={recipeId} />

            {/* Review Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Review Title
              </label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
              />
            </div>

            {/* Rating */}
            <div className="mb-3">
              <label htmlFor="rating" className="form-label fw-semibold">
                Rating (1–10)
              </label>
              <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="form-control"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
              />
            </div>

            {/* Feedback */}
            <div className="mb-3">
              <label htmlFor="feedback" className="form-label fw-semibold">
                Feedback
              </label>
              <textarea
                  id="feedback"
                  name="feedback"
                  className="form-control"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
              />
            </div>

            {/* Nickname */}
            <div className="mb-3">
              <label htmlFor="nickname" className="form-label fw-semibold">
                Nickname (optional)
              </label>
              <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  className="form-control"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="How should we display your name?"
              />
            </div>

            {/* Submit + Back */}
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/recipes/${recipeId}`} className="btn btn-outline-secondary">
                &larr; Back to Recipe
              </Link>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default CreateReviewPage
