import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import CreateReviewPage from "./pages/CreateReviewPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";


function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-recipe" element={<CreateRecipePage />} />
                <Route path="/create-review/:recipeId" element={<CreateReviewPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            </Routes>
        </>
    );
}

export default App;
