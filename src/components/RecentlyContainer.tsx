import { Container, Text, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import RecipeList from "./RecipeList";

const RecentlyContainer: React.FC = () => {
  const { viewedRecipeList } = useContext(RecipesContext);
  return (
    <>
      {viewedRecipeList.length > 0 && (
        <Container maxW="container.xl">
          <Box mt="4">
            <Text
              fontWeight="700"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="black"
            >
              Recently viewed recipes
            </Text>
          </Box>
          <RecipeList recipes={viewedRecipeList} />
        </Container>
      )}
    </>
  );
};

export default RecentlyContainer;
