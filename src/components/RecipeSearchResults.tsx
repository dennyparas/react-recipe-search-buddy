import React, { useEffect, useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import { Center, Container, Box, Button, Text } from "@chakra-ui/react";
import NotFound from "./NotFound";
import ErrorResponse from "./ErrorResponse";
import RecipeList from "./RecipeList";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const RecipeSearchResults: React.FC = () => {
  const {
    recipes,
    recipeNotFound,
    apiError,
    clearRecipeSearch,
    isLoading,
    loadMore,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (recipeNotFound || apiError) {
      clearRecipeSearch();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="container.xl">
      {recipeNotFound && <NotFound />}
      {apiError && <ErrorResponse />}
      {!isLoading && recipes.count > 0 && (
        <>
          <Box mt="4">
            <Text
              fontWeight="700"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="black"
            >
              {recipes.count} Recipes found
            </Text>
          </Box>
        </>
      )}

      <RecipeList recipes={recipes.hits} />

      {isLoading && <RecipeCardSkeleton length={8} />}

      {recipes._links.next && !isLoading && (
        <Center pb="5">
          <Button
            colorScheme="red"
            onClick={() => loadMore(recipes._links.next.href)}
          >
            Load More Recipes...
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default RecipeSearchResults;
