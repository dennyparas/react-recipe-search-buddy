import React, { useContext } from "react";
import Searchbar from "../components/Searchbar";
import RecipeSearchResults from "../components/RecipeSearchResults";
import { RecipesContext } from "../context/recipeContext";
import RecentlyContainer from "../components/RecentlyContainer";

const Home: React.FC = () => {
  const { recipes, isLoading, recipeNotFound, apiError } =
    useContext(RecipesContext);
  return (
    <>
      <Searchbar></Searchbar>
      {isLoading || recipes.count !== 0 || recipeNotFound || apiError ? (
        <RecipeSearchResults />
      ) : (
        <RecentlyContainer />
      )}
    </>
  );
};

export default Home;
