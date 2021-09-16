import React, { useState } from "react";
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

type Props = {
  hit: {
    recipe: {
      uri: string;
      image: string;
      source: string;
      label: string;
      url: string;
      calories: number;
      yield: number;
      ingredients: object[];
    };
  };
};

const RecipeCard: React.FC<Props> = ({ hit }) => {
  const [isRedirectAlert, setIsRedirectAlert] = useState(false);
  const { recipe } = hit;
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

  const totalCal = calories / servings;

  const getRecipeId = () => {
    return uri.split("#")[1];
  };

  const showRedirectAlert = () => {
    setIsRedirectAlert(true);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        boxShadow: "2xl",
      }}
    >
      <Box h={"300px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image
          height="300px"
          loading="eager"
          w={"full"}
          src={image}
          objectFit={"cover"}
          alt={label}
          fallbackSrc={fallbackImg}
        />
      </Box>
      <Box px="4">
        <Text
          onClick={() => showRedirectAlert()}
          color={"red.400"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
          mb="1.5"
          cursor="pointer"
        >
          {source}
        </Text>
        <Box height="56px">
          <Heading
            display="block"
            as={Link}
            to={`/recipe/${getRecipeId()}`}
            color={useColorModeValue("gray.700", "white")}
            fontSize={"1xl"}
            fontFamily={"body"}
          >
            {label}
          </Heading>
        </Box>
        <Divider orientation="horizontal" mt="2" mb="3" />
        <Stack
          alignSelf="flex-end"
          direction={"row"}
          justify={"center"}
          spacing={12}
          mt="2"
          mb="3"
        >
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>{totalCal.toFixed()}</Text>
            <Text fontSize={"sm"} color={"red.300"}>
              Calories
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>{ingredients.length}</Text>
            <Text fontSize={"sm"} color={"red.300"}>
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
