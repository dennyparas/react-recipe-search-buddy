import React, { useContext } from "react";
import Searchbar from "../components/Searchbar";
import RecipeList from "../components/RecipeList";
import { RecipesContext } from "../context/recipeContext";

const Home: React.FC = () => {
  const { recipes, isLoading } = useContext(RecipesContext);

  return (
    <>
      <Searchbar></Searchbar>
      {isLoading || recipes ? <RecipeList /> : ""}
    </>
  );
};

export default Home;
