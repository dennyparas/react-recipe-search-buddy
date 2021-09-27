import {
  Container,
  Text,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import RecipeList from "./RecipeList";

const RecentlyContainer: React.FC = () => {
  const {
    viewedRecipeList,
    favorites,
    queryList,
    removeSearchItem,
    searchRecipes,
  } = useContext(RecipesContext);
  return (
    <>
      {queryList.length > 0 && (
        <Container maxW="container.xl">
          <Box mt="4" mb="4">
            <Text
              fontWeight="700"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="black"
            >
              Recently Search
            </Text>
          </Box>
          {queryList.map((query: any, index: number) => (
            <Tag
              size="md"
              mr="3"
              mb="2"
              key={index}
              borderRadius="full"
              variant="outline"
              colorScheme="red"
            >
              <TagLabel
                cursor="pointer"
                onClick={() => searchRecipes(query.query, query.mealType)}
              >
                {query.query} {query.mealType && `- ${query.mealType}`}
              </TagLabel>
              <TagCloseButton onClick={() => removeSearchItem(query.query)} />
            </Tag>
          ))}
        </Container>
      )}

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
      {favorites.length > 0 && (
        <Container maxW="container.xl">
          <Box mt="4">
            <Text
              fontWeight="700"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="black"
            >
              Recently added to favorites
            </Text>
          </Box>
          <RecipeList recipes={favorites} limit={5} />
        </Container>
      )}
    </>
  );
};

export default RecentlyContainer;
