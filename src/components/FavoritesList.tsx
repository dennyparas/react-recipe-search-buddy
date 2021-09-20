import { Box, Text, Container, Center } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RecipesContext } from "./../context/recipeContext";
import RecipeList from "./RecipeList";

const FavoritesList: React.FC = () => {
  const { favorites } = useContext(RecipesContext);
  return (
    <>
      <Container maxW="container.xl">
        {favorites.length === 0 && (
          <Box mt="10">
            <Center>
              <Text
                align="center"
                fontWeight="700"
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                color="black"
              >
                You don't have any favorite recipes . <br />
                Please search a recipe and tap the Star button or Add to
                favorites button.
              </Text>
            </Center>
          </Box>
        )}
        {favorites.length > 0 && (
          <>
            <Box mt="4">
              <Text
                fontWeight="700"
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                color="black"
              >
                {favorites.length} Favorite Recipes
              </Text>
            </Box>
            <RecipeList recipes={favorites} />
          </>
        )}
      </Container>
    </>
  );
};

export default FavoritesList;
