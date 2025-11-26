// src/pages/CreateRecipePage.jsx
import { Link, useNavigate } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'

function CreateRecipePage()
{
  const navigate = useNavigate()

  function handleSuccess(createdRecipe)
  {
    // if backend returns recipeID like before, redirect there
    if (createdRecipe && createdRecipe.recipeID)
    {
      navigate(`/recipes/${createdRecipe.recipeID}`)
    }
    else
    {
      navigate('/')
    }
  }

  return (
      <div className="container my-5">
        <div className="col-md-8 col-lg-6 mx-auto bg-white p-4 rounded shadow-sm">
          {/* Back Button */}
          <Link to="/" className="btn btn-outline-secondary mb-3">
            &larr; Back
          </Link>

          {/* Page Title */}
          <h2 className="text-center mb-4 fw-bold">Post Recipe</h2>

          <RecipeForm onSuccess={handleSuccess} />
        </div>
      </div>
  )
}

export default CreateRecipePage
