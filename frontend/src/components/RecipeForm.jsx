// src/components/recipes/RecipeForm.jsx
import { useState } from 'react'

function RecipeForm({ onSuccess })
{
  const [title, setTitle] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event)
  {
    event.preventDefault()
    setError('')

    if (!imageFile)
    {
      setError('Please upload an image.')
      return
    }

    // optional: basic client-side image validation
    const maxSizeBytes = 2 * 1024 * 1024 // 2MB
    if (imageFile.size > maxSizeBytes)
    {
      setError('Image must be 2MB or smaller.')
      return
    }

    try
    {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('prepTime', prepTime)
      formData.append('cookTime', cookTime)
      formData.append('ingredients', ingredients)
      formData.append('instructions', instructions)
      formData.append('image', imageFile)

      // NOTE:
      // Your backend for assignment 2 should accept multipart/form-data
      const response = await fetch('http://localhost:4000/api/recipes',
          {
            method: 'POST',
            body: formData
          })

      if (!response.ok)
      {
        const text = await response.text()
        throw new Error(text || 'Failed to create recipe')
      }

      const created = await response.json()
      if (onSuccess)
      {
        onSuccess(created)
      }

      // reset form
      setTitle('')
      setPrepTime('')
      setCookTime('')
      setIngredients('')
      setInstructions('')
      setImageFile(null)
    }
    catch (err)
    {
      setError(err.message || 'Failed to create recipe')
    }
    finally
    {
      setIsSubmitting(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error && (
            <div className="alert alert-danger">
              {error}
            </div>
        )}

        {/* Recipe Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title
          </label>
          <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
        </div>

        {/* Prep & Cook Time */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="prepTime" className="form-label fw-semibold">
              Prep Time (mins)
            </label>
            <input
                type="number"
                className="form-control"
                id="prepTime"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                min="0"
                required
            />
          </div>
          <div className="col">
            <label htmlFor="cookTime" className="form-label fw-semibold">
              Cook Time (mins)
            </label>
            <input
                type="number"
                className="form-control"
                id="cookTime"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                min="0"
                required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label fw-semibold">
            Ingredients
          </label>
          <textarea
              className="form-control"
              id="ingredients"
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List each ingredient on a new line"
              required
          />
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label fw-semibold">
            Instructions
          </label>
          <textarea
              className="form-control"
              id="instructions"
              rows="5"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step instructions"
              required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-semibold">
            Upload an Image
          </label>
          <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={(e) =>
              {
                if (e.target.files && e.target.files[0])
                {
                  setImageFile(e.target.files[0])
                }
              }}
              required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
  )
}

export default RecipeForm
