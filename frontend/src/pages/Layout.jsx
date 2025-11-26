import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Determine which page we're on (mimics your isCreateRecipe / isLoginPage)
  const isCreateRecipePage = location.pathname === "/create-recipe";
  const isLoginPage = location.pathname === "/login";

  return (
      <div className="container">
        <nav className="navbar navbar-light bg-light mb-4">
          <div className="navbar-brand font-weight-bold">RecipeHub</div>

          <div className="justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row">

              {!isCreateRecipePage && (
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
  );
}

export default Navbar;
