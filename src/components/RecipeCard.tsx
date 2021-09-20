import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Heading,
  useColorModeValue,
  Stack,
  Divider,
} from "@chakra-ui/react";
import fallbackImg from "./../assets/300x300-default.png";
import RedirectAlert from "./RedirectAlert";
import { RecipesContext } from "../context/recipeContext";
import { Recipe } from "./../types/Recipe";
import FavoriteButton from "./FavoriteButton";
import { useHistory } from "react-router-dom";

const RecipeCard: React.FC<Recipe> = ({ recipe }) => {
  const history = useHistory();
  const { saveViewedRecipes } = useContext(RecipesContext);
  const [isRedirectAlert, setIsRedirectAlert] = useState(false);
  const {
    uri,
    image,
    source,
    label,
    url,
    calories,
    yield: servings,
    ingredients,
  } = recipe;

  const getRecipeId = () => {
    return uri.split("#")[1];
  };

  const goToPage = (page: string) => {
    saveViewedRecipes({ recipe });
    history.push(page);
  };

  const showRedirectAlert = () => {
    setIsRedirectAlert(true);
  };

  return (
    <Box
      maxW={{ base: "100%", sm: "sm" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        boxShadow: "2xl",
      }}
    >
      <Box
        h={{ base: "150px", sm: "300px" }}
        bg={"gray.100"}
        mt={-6}
        mx={-6}
        mb={{ base: "2", sm: "6" }}
        pos={"relative"}
      >
        <Box position="absolute" top="10" right="10">
          <FavoriteButton recipe={recipe} />
        </Box>
        <Image
          height={{ base: "150px", sm: "300px" }}
          loading="eager"
          w={"full"}
          src={image}
          objectFit={"cover"}
          fallbackSrc={fallbackImg}
          onClick={() => goToPage(`/recipe/${getRecipeId()}`)}
          cursor="pointer"
        />
      </Box>
      <Box px="4">
        <Text
          onClick={() => showRedirectAlert()}
          color={"red.400"}
          textTransform={"uppercase"}
          fontWeight={{ base: 600, sm: 800 }}
          fontSize={{ base: "xs", sm: "sm" }}
          letterSpacing={1}
          mb={{ base: "xs", sm: "1.5" }}
          cursor="pointer"
        >
          {source}
        </Text>
        <Box minheight="56px">
          <Heading
            display="block"
            as={Link}
            to={`/recipe/${getRecipeId()}`}
            color={useColorModeValue("gray.700", "white")}
            fontSize={{ base: "xs", sm: "md", md: "md" }}
            fontFamily={"body"}
            onClick={() => saveViewedRecipes({ recipe })}
          >
            {label}
          </Heading>
        </Box>
        <Divider orientation="horizontal" mt="2" mb="3" />
        <Stack direction={"row"} justify={"center"} mb="2">
          <Stack flex={1} spacing={1} align={"center"}>
            <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight={600}>
              {(calories / servings).toFixed()}
            </Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} color={"red.300"}>
              Calories
            </Text>
          </Stack>
          <Stack flex={1} spacing={1} align={"center"}>
            <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight={600}>
              {ingredients.length}
            </Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} color={"red.300"}>
              Ingredients
            </Text>
          </Stack>
        </Stack>
      </Box>
      {isRedirectAlert && (
        <RedirectAlert
          open={isRedirectAlert}
          sourceUrl={url}
          toggle={() => setIsRedirectAlert(!isRedirectAlert)}
        />
      )}
    </Box>
  );
};

export default RecipeCard;
