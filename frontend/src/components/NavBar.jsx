// src/components/layout/Navbar.jsx
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <NavLink className="navbar-brand font-weight-bold" to="/">
                    RecipeHub
                </NavLink>

                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav d-flex flex-row gap-2">

                        <li className="nav-item p-2">
                            <NavLink
                                to="/create-recipe"
                                className={({ isActive }) =>
                                    "btn btn-primary" + (isActive ? "" : " btn-outline-primary")
                                }
                            >
                                Create Recipe
                            </NavLink>
                        </li>

                        <li className="nav-item p-2">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    "btn btn-primary" + (isActive ? "" : " btn-outline-primary")
                                }
                            >
                                Login
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
