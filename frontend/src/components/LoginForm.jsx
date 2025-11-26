"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login data:", formData)
    navigate("/")
  }

  return (
    <div className="container my-5">
      <div className="col-md-6 col-lg-4 mx-auto bg-white p-4 rounded shadow-sm">
        <Link to="/" className="btn btn-outline-secondary mb-3">
          ← Back
        </Link>

        <h2 className="text-center mb-4 fw-bold">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
