"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function CreateRecipePage() {
  const [formData, setFormData] = useState({
    title: "",
    prepTime: "",
    cookTime: "",
    ingredients: "",
    instructions: "",
    image: null,
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key])
    })

    try {
      const res = await fetch("/api/create-recipe", {
        method: "POST",
        body: formDataToSend,
      })
      if (res.ok) {
        navigate("/")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container my-5">
      <div className="col-md-8 col-lg-6 mx-auto bg-white p-4 rounded shadow-sm">
        <Link to="/" className="btn btn-outline-secondary mb-3">
          &larr; Back
        </Link>

        <h2 className="text-center mb-4 fw-bold">Post Recipe</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="prepTime" className="form-label fw-semibold">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cookTime" className="form-label fw-semibold">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label fw-semibold">
              Ingredients
            </label>
            <input
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder='Example: "1/2 cup heavy cream"'
              required
            />
            <small className="text-muted">
              Please enter in the format: <em>Quantity measurement ingredient</em>
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label fw-semibold">
              Instructions
            </label>
            <input
              className="form-control"
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter step-by-step cooking instructions"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label fw-semibold">
              Upload Image of the Dish
            </label>
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
