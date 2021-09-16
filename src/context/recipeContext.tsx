import React, { useState, createContext } from "react";
import axios from "axios";

const rootUrl = "https://api.edamam.com/api/recipes/v2";

let APP_ID: string;
let APP_KEY: string;

if (process.env.NODE_ENV !== "production") {
  APP_ID = process.env.REACT_APP_RECIPE_APP_ID || "";
  APP_KEY = process.env.REACT_APP_RECIPE_APP_KEY || "";
} else {
  APP_ID = process.env.RECIPE_APP_ID || "";
  APP_KEY = process.env.RECIPE_APP_KEY || "";
}

type Recipes = {
  count: number;
  hits: object[];
  _links: any;
};

type RecipeContextState = {
  searchRecipes: (recipe: string, mealType: string) => void;
  clearRecipeSearch: () => void;
  loadMore: (url: string) => void;
  recipes: Recipes;
  isLoading: boolean;
  apiError: boolean;
  recipeNotFound: boolean;
};

const RecipeContextDefaultValues: RecipeContextState = {
  recipes: { count: 0, hits: [], _links: {} },
  isLoading: false,
  apiError: false,
  recipeNotFound: false,
  searchRecipes: () => {},
  clearRecipeSearch: () => {},
  loadMore: () => {},
};

const RecipesContext = createContext<RecipeContextState>(
  RecipeContextDefaultValues
);

const RecipesProvider: React.FC = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipes>({
    count: 0,
    hits: [],
    _links: {},
  });
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);

  const loadMore = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios(url);
      setRecipes({
        count: response.data.count,
        hits: [...recipes.hits, ...response.data.hits],
        _links: response.data._links,
      });
    } catch (error) {
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecipeSearch = () => {
    setApiError(false);
    setRecipes({ count: 0, hits: [], _links: {} });
    setRecipeNotFound(false);
  };

  const searchRecipes = async (recipe: string, mealType: string = "") => {
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
        setRecipes(response.data);
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
        loadMore,
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
