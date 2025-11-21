"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
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
      <div className="col-md-6 col-lg-4 mx-auto bg-white p-4 rounded shadow-sm">
        <Link to="/" className="btn btn-outline-secondary mb-3">
          &larr; Back
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
