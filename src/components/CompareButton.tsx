import React, { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, useToast } from "@chakra-ui/react";

type CompareButtonProps = {
  recipe: { label: string; uri: string };
};

const CompareButton: React.FC<CompareButtonProps> = ({ recipe }) => {
  const { label, uri } = recipe;

  const toast = useToast();
  const { compareList, unCompareItem, compareItem } =
    useContext(RecipesContext);
  const isInCompare = (item: any) => {
    if (compareList !== null) {
      return (
        compareList.findIndex(
          (compareItem: any) => compareItem.recipe.uri === item
        ) > -1
      );
    }
  };

  const handleUnCompareClick = () => {
    unCompareItem(uri);
    toast({
      position: "bottom",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} bg="red.500" borderRadius="lg">
          {label} has been remove to Compare items
        </Box>
      ),
    });
  };

  const handleCompareClick = () => {
    compareItem({ recipe, uri });
    toast({
      position: "bottom",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius="lg">
          {label} has been added to Compare items
        </Box>
      ),
    });
  };
  return (
    <>
      {isInCompare(uri) && (
        <Button
          size="xs"
          colorScheme="red"
          leftIcon={<MinusIcon color="yellow.400" />}
          onClick={handleUnCompareClick}
        >
          Remove to Compare items
        </Button>
      )}
      {!isInCompare(uri) && (
        <Button
          size="xs"
          colorScheme="red"
          leftIcon={<AddIcon color="white" />}
          onClick={handleCompareClick}
        >
          Add to Compare
        </Button>
      )}
    </>
  );
};

export default CompareButton;
