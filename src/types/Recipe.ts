export type Recipes = {
  count: number;
  hits: object[];
  _links: any;
};

export type RecipeInfo = {
  source: string;
  uri: string;
  label: string;
  image: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: [];
  healthLabels: [];
  cautions: [];
  ingredientLines: [];
  ingredients: object[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: [];
  mealType: [];
  dishType: [];
  totalNutrients: object;
  totalDaily: {
    ENERC_KCAL: {
      quantity: number;
    };
  };
  digest: [];
};

export type Recipe = {
  recipe: {
    uri: string;
    image: string;
    source: string;
    label: string;
    url: string;
    calories: number;
    yield: number;
    ingredients: object[];
  };
};

export type RecipeContextState = {
  setSearchQuery: (searchQuery: string) => void;
  setMealType: (mealType: string) => void;
  searchRecipes: (recipe: string, mealType: string) => void;
  clearRecipeSearch: () => void;
  loadMore: (url: string) => void;
  getRecipeInfo: (recipeId: string) => void;
  favoriteItem: (recipeItem: object) => void;
  unFavoriteItem: (recipeItem: string) => void;
  compareItem: (recipeItem: object) => void;
  unCompareItem: (recipeItem: string) => void;
  saveViewedRecipes: (recipe: Recipe) => void;
  removeSearchItem: (query: string) => void;
  searchQuery: string;
  mealType: string;
  recipes: Recipes;
  isLoading: boolean;
  apiError: boolean;
  recipeNotFound: boolean;
  recipeInfo: RecipeInfo;
  favorites: object[];
  compareList: object[];
  queryList: object[];
  viewedRecipeList: object[];
};
