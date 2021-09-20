import React, { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Tooltip, useToast } from "@chakra-ui/react";

type FavoriteButtonProps = {
  recipe: { label: string; uri: string };
  iconOnly?: boolean;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  iconOnly,
}) => {
  const { label, uri } = recipe;

  const toast = useToast();
  const { favorites, unFavoriteItem, favoriteItem } =
    useContext(RecipesContext);
  const isFavorite = (item: any) => {
    if (favorites !== null) {
      return (
        favorites.findIndex((favorite: any) => favorite.recipe.uri === item) >
        -1
      );
    }
  };

  const handleUnfavoriteClick = () => {
    unFavoriteItem(uri);
    toast({
      position: "bottom",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} bg="red.500" borderRadius="lg">
          {label} has been remove to favorites
        </Box>
      ),
    });
  };

  const handleFavoriteClick = () => {
    favoriteItem({ recipe, uri });
    toast({
      position: "bottom",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius="lg">
          {label} has been added to favorites
        </Box>
      ),
    });
  };
  return (
    <>
      {isFavorite(uri) && (
        <>
          {iconOnly ? (
            <Button
              size="xs"
              colorScheme="red"
              leftIcon={<StarIcon color="yellow.400" />}
              onClick={handleUnfavoriteClick}
              mr="3"
            >
              Remove to favorites
            </Button>
          ) : (
            <Tooltip
              hasArrow
              label="Remove to favorites"
              bg="yellow.300"
              color="black"
            >
              <IconButton
                size="xs"
                isRound={true}
                colorScheme="red"
                aria-label="unfavorite"
                icon={<StarIcon color="yellow.400" />}
                onClick={handleUnfavoriteClick}
              />
            </Tooltip>
          )}
        </>
      )}
      {!isFavorite(uri) && (
        <>
          {iconOnly ? (
            <Button
              size="xs"
              colorScheme="red"
              leftIcon={<StarIcon color="white" />}
              onClick={handleFavoriteClick}
              mr="3"
            >
              Add to favorites
            </Button>
          ) : (
            <Tooltip
              hasArrow
              label="Add to favorites"
              bg="yellow.300"
              color="black"
            >
              <IconButton
                size="xs"
                isRound={true}
                colorScheme="red"
                aria-label="favorite"
                icon={<StarIcon color="white" />}
                onClick={handleFavoriteClick}
              />
            </Tooltip>
          )}
        </>
      )}
    </>
  );
};

export default FavoriteButton;
