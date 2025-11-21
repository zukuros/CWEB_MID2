import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../public/stylesheets/style.css"

export default function Layout({ children, isCreateRecipe, isLoginPage }) {
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand font-weight-bold">RecipeHub</div>
          <div className="justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row">
              {!isCreateRecipe && (
                <li className="nav-item p-2">
                  <Link className="btn btn-primary" to="/create-recipe">
                    Create Recipe
                  </Link>
                </li>
              )}
              {!isLoginPage && (
                <li className="nav-item p-2">
                  <Link className="btn btn-primary" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      {children}
    </>
  )
}
