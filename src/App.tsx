import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipesProvider } from "./context/recipeContext";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";

const App: React.FC = () => {
  return (
    <RecipesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipe_id" element={<Recipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </Router>
    </RecipesProvider>
  );
};

export default App;
