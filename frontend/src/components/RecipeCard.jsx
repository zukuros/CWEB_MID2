import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
      <div className="col-md-4 mb-4">
        <div className="card shadow-sm">
          <img
              src={recipe.photoURL_Path}
              className="card-img-top"
              alt={recipe.title}
              style={{ height: "200px", objectFit: "cover" }}
          />

          <div className="card-body text-center">
            <h5 className="card-title">{recipe.title}</h5>

            <Link
                to={`/recipes/${recipe.id}`}
                className="btn btn-outline-primary btn-sm mt-2"
            >
              View Recipe
            </Link>
          </div>
        </div>
      </div>
  );
}

export default RecipeCard;
