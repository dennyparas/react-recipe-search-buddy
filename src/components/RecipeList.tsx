import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import RecipeCard from "./RecipeCard";

type RecipesProps = {
  recipes: object[];
};

const RecipeList: React.FC<RecipesProps> = ({ recipes }) => {
  return (
    <SimpleGrid
      pt="4"
      pb="6"
      columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: 2, sm: 7 }}
    >
      {recipes.map((recipe: any, index: number) => (
        <RecipeCard key={index} recipe={recipe.recipe} />
      ))}
    </SimpleGrid>
  );
};

export default RecipeList;
