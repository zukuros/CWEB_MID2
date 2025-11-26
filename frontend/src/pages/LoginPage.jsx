// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage()
{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event)
  {
    event.preventDefault()
    setError('')

    try
    {
      // TODO: adjust URL + payload to match your real auth API
      const response = await fetch('http://localhost:4000/api/auth/login',
          {
            method: 'POST',
            headers:
                {
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify({ username, password, email })
          })

      if (!response.ok)
      {
        const text = await response.text()
        throw new Error(text || 'Login failed')
      }

      const data = await response.json()
      // TODO: store token/user in context or localStorage
      console.log('Logged in:', data)

      navigate('/')
    }
    catch (err)
    {
      setError(err.message || 'Login failed')
    }
  }

  return (
      <div className="container my-5">
        <div className="col-md-6 col-lg-4 mx-auto bg-white p-4 rounded shadow-sm">
          {/* Back Button */}
          <Link to="/" className="btn btn-outline-secondary mb-3">
            &larr; Back
          </Link>

          {/* Page Title */}
          <h2 className="text-center mb-4 fw-bold">Login</h2>

          {error && (
              <div className="alert alert-danger">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
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

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
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

            {/* Submit */}
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

export default LoginPage
