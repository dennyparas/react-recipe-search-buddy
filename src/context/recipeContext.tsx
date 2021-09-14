import React, { useState, createContext } from "react";
import axios from "axios";

const rootUrl = "https://api.edamam.com/api/recipes/v2";

let APP_ID: String;
let APP_KEY: String;

if (process.env.NODE_ENV !== "production") {
  APP_ID = process.env.REACT_APP_RECIPE_APP_ID || "";
  APP_KEY = process.env.REACT_APP_RECIPE_APP_KEY || "";
} else {
  APP_ID = process.env.RECIPE_APP_ID || "";
  APP_KEY = process.env.RECIPE_APP_KEY || "";
}

const RecipesContext = createContext<any>(null);

const RecipesProvider: React.FC = ({ children }) => {
  const [recipes, setRecipes] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);

  const clearRecipeSearch = () => {
    setApiError(false);
    setRecipes(null);
    setRecipeNotFound(false);
  };

  const searchRecipes = async (recipe: String, mealType: String) => {
    const request = !mealType
      ? `${rootUrl}?type=public&q=${recipe}&app_id=${APP_ID}&app_key=${APP_KEY}`
      : `${rootUrl}?type=public&q=${recipe}&mealType=${mealType}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
      clearRecipeSearch();
      setIsLoading(true);
      const response = await axios(request);
      const {
        data: { count },
      } = response;
      if (count) {
        setRecipes(response.data.hits);
      } else {
        setRecipeNotFound(true);
      }
    } catch (err) {
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        clearRecipeSearch,
        searchRecipes,
        recipes,
        isLoading,
        apiError,
        recipeNotFound,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
export { RecipesProvider, RecipesContext };
