"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="container">
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={recipe.photoURL_Path || "/placeholder.svg"}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{recipe.title}</h5>
                  <Link to={`/recipes/${recipe.id}`} className="btn btn-outline-primary btn-sm mt-2">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  )
}
