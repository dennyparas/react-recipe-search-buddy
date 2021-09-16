import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/layout";
import SkeletonCard from "./SkeletonCard";
import React, { useEffect, useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import RecipeCard from "./RecipeCard";
import { Box, Button, Text } from "@chakra-ui/react";

const RecipeList: React.FC = () => {
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
      {recipeNotFound && (
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 3, md: 5 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading fontWeight={600} fontSize={"2xl"} lineHeight={"110%"}>
            We couldn't find any matches for your search query
          </Heading>
          <Text color={"red.400"}>
            Double check your search for any typos or spelling errors - or try a
            different search term.
          </Text>
        </Stack>
      )}
      {apiError && (
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 3, md: 5 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading fontWeight={600} fontSize={"2xl"} lineHeight={"110%"}>
            Sorry, we’re unable to process your request.
          </Heading>
          <Text pt="3" color={"red.400"}>
            Please try again later.
          </Text>
        </Stack>
      )}

      {recipes.count > 0 && (
        <Box mt="10">
          <Text fontWeight="700" fontSize="xl" color="black">
            {recipes.count} Recipes found
          </Text>
        </Box>
      )}
      <SimpleGrid
        pt="8"
        pb="6"
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        spacing={7}
      >
        {recipes.count > 0 &&
          recipes.hits.map((recipe: any, id) => (
            <RecipeCard key={id} hit={recipe} />
          ))}
        {isLoading &&
          Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
      </SimpleGrid>
      {recipes._links.next && !isLoading && (
        <Center pb="5">
          <Button
            colorScheme="blue"
            onClick={() => loadMore(recipes._links.next.href)}
          >
            Load More Recipes...
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default RecipeList;
