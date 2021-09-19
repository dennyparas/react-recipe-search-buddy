import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import {
  Recipe,
  Recipes,
  RecipeInfo,
  RecipeContextState,
} from "./../types/Recipe";

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

const RecipeContextDefaultValues: RecipeContextState = {
  searchRecipes: () => {},
  clearRecipeSearch: () => {},
  loadMore: () => {},
  getRecipeInfo: () => {},
  favoriteItem: () => {},
  unFavoriteItem: () => {},
  compareItem: () => {},
  unCompareItem: () => {},
  saveViewedRecipes: () => {},
  recipes: { count: 0, hits: [], _links: {} },
  isLoading: false,
  apiError: false,
  recipeNotFound: false,
  recipeInfo: {
    source: "",
    uri: "",
    label: "",
    image: "",
    url: "",
    shareAs: "",
    yield: 0,
    dietLabels: [],
    healthLabels: [],
    cautions: [],
    ingredientLines: [],
    ingredients: [],
    calories: 0,
    totalWeight: 0,
    totalTime: 0,
    cuisineType: [],
    mealType: [],
    dishType: [],
    totalNutrients: {},
    totalDaily: {
      ENERC_KCAL: {
        quantity: 0,
      },
    },
    digest: [],
  },
  favorites: [],
  compareList: [],
  queryList: [],
  viewedRecipeList: [],
};

const RecipesContext = createContext<RecipeContextState>(
  RecipeContextDefaultValues
);

const RecipesProvider: React.FC = ({ children }) => {
  const [compareList, setCompareList] = useState<object[]>([]);
  const [favorites, setFavorites] = useState<object[]>([]);
  const [recipes, setRecipes] = useState<Recipes>(
    RecipeContextDefaultValues.recipes
  );
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfo>(
    RecipeContextDefaultValues.recipeInfo
  );
  const [queryList, setQueryList] = useState<object[]>([]);
  const [viewedRecipeList, setViewedRecipeList] = useState<object[]>([]);

  const getQueryList = () => {
    let queryList = localStorage.getItem("queryList");
    if (queryList === null) {
      setQueryList([]);
    } else {
      setQueryList(JSON.parse(queryList));
    }
  };

  const getViewedRecipeList = () => {
    let viewedRecipeList = localStorage.getItem("viewedRecipeList");
    if (viewedRecipeList === null) {
      setViewedRecipeList([]);
    } else {
      setViewedRecipeList(JSON.parse(viewedRecipeList));
    }
  };

  const saveViewedRecipes = (recipe: Recipe) => {
    let currentViewedRecipeList = viewedRecipeList;
    let newViewedRecipeList = [];

    if (currentViewedRecipeList) {
      const removeIndex = currentViewedRecipeList.findIndex(
        (item: any) => item.recipe.uri === recipe.recipe.uri
      );

      if (removeIndex !== -1) currentViewedRecipeList.splice(removeIndex, 1);

      newViewedRecipeList = [recipe, ...currentViewedRecipeList];

      if (newViewedRecipeList.length >= 6) {
        newViewedRecipeList.pop();
      }
      setViewedRecipeList(newViewedRecipeList);
    } else {
      newViewedRecipeList = [recipe, ...currentViewedRecipeList];
      setViewedRecipeList(newViewedRecipeList);
    }
    localStorage.setItem(
      "viewedRecipeList",
      JSON.stringify(newViewedRecipeList)
    );
  };

  const saveSearchQuery = (query: string, mealType: string) => {
    let currentQueryList = queryList;
    const queryItem = { query, mealType };
    let newQueryList = [];
    if (currentQueryList) {
      const removeIndex = currentQueryList.findIndex(
        (item: any) => item.query === query && item.mealType === mealType
      );

      if (removeIndex !== -1) currentQueryList.splice(removeIndex, 1);

      newQueryList = [queryItem, ...currentQueryList];
      if (newQueryList.length >= 11) {
        newQueryList.pop();
      }
      setQueryList(newQueryList);
    } else {
      newQueryList = [queryItem, ...currentQueryList];
      setQueryList(newQueryList);
    }
    localStorage.setItem("queryList", JSON.stringify(newQueryList));
  };

  const getFavorites = () => {
    setApiError(false);
    setRecipeNotFound(false);
    let favoriteItems = localStorage.getItem("favorites");
    if (favoriteItems === null) {
      setFavorites([]);
    } else {
      setFavorites(JSON.parse(favoriteItems));
    }
  };

  const getCompareList = () => {
    setApiError(false);
    setRecipeNotFound(false);
    let compareList = localStorage.getItem("compareList");
    if (compareList === null) {
      setFavorites([]);
    } else {
      setCompareList(JSON.parse(compareList));
    }
  };

  const compareItem = (compareItem: object) => {
    let newCompareList = [compareItem, ...compareList];
    if (newCompareList.length >= 4) {
      newCompareList.pop();
    }

    setCompareList(newCompareList);

    localStorage.setItem("compareList", JSON.stringify(newCompareList));
  };

  const unCompareItem = (item: string) => {
    const newCompareList = compareList.filter(
      (oldCompareItem: any) => oldCompareItem.recipe.uri !== item
    );

    setCompareList(newCompareList);
    localStorage.setItem("compareList", JSON.stringify(newCompareList));
  };

  const favoriteItem = (recipeItem: object) => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, recipeItem])
    );

    setFavorites([...favorites, recipeItem]);
  };

  const unFavoriteItem = (item: string) => {
    const newFavorites = favorites.filter(
      (oldFavorite: any) => oldFavorite.recipe.uri !== item
    );

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const getRecipeInfo = async (recipeId: string) => {
    try {
      setIsLoading(true);
      const request = `${rootUrl}/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=LARGE`;
      const response = await axios(request);

      setRecipeInfo(response.data.recipe);
    } catch (error: any) {
      if (!error.response) {
        setApiError(true);
      } else {
        setRecipeNotFound(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        saveSearchQuery(recipe, mealType);
      } else {
        setRecipeNotFound(true);
      }
    } catch (err) {
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompareList();
    getQueryList();
    getFavorites();
    getViewedRecipeList();
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        clearRecipeSearch,
        searchRecipes,
        loadMore,
        getRecipeInfo,
        favoriteItem,
        unFavoriteItem,
        compareItem,
        unCompareItem,
        saveViewedRecipes,
        recipes,
        isLoading,
        apiError,
        recipeNotFound,
        recipeInfo,
        favorites,
        compareList,
        queryList,
        viewedRecipeList,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
export { RecipesProvider, RecipesContext };
