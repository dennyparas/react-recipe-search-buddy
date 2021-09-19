import {
  Container,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
  OrderedList,
  ListItem,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { RecipesContext } from "../context/recipeContext";
import fallbackImg from "./../assets/300x300-default.png";
import RedirectAlert from "./RedirectAlert";
import RecipeInfoSkeleton from "./RecipeInfoSkeleton";
import ErrorResponse from "./ErrorResponse";
import NotFound from "./NotFound";
import FavoriteButton from "./FavoriteButton";
import CompareButton from "./CompareButton";

const RecipeInfo: React.FC = () => {
  const { recipe_id } = useParams();
  const [isRedirectAlert, setIsRedirectAlert] = useState(false);
  const { getRecipeInfo, recipeInfo, isLoading, recipeNotFound, apiError } =
    useContext(RecipesContext);

  useEffect(() => {
    if (recipe_id) {
      getRecipeInfo(`${recipe_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showRedirectAlert = () => {
    setIsRedirectAlert(true);
  };

  return (
    <Container maxW="container.xl">
      {isLoading && <RecipeInfoSkeleton />}
      {recipeNotFound && <NotFound />}
      {apiError && <ErrorResponse />}
      {!isLoading && recipeInfo.label && (
        <Stack
          spacing={{ base: 8, md: 10 }}
          py={10}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 3, md: 4 }}>
            <Box pos={"relative"}>
              <Image
                loading="eager"
                w={"full"}
                src={recipeInfo.image}
                objectFit={"cover"}
                alt={recipeInfo.label}
                fallbackSrc={fallbackImg}
              />
            </Box>
            <Divider orientation="horizontal" mt="1" mb="3" />
            <Stack direction={"row"} justify={"center"} spacing={9}>
              <Stack flex={1} spacing={1} align={"center"}>
                <Text fontWeight={600}>
                  {(recipeInfo.calories / recipeInfo.yield).toFixed()}
                </Text>
                <Text fontSize={"sm"} color={"red.300"} align="center">
                  Calories per Serving
                </Text>
              </Stack>
              {recipeInfo.totalDaily && (
                <Stack flex={1} spacing={1} align={"center"}>
                  <Text fontWeight={600}>
                    {(
                      recipeInfo.totalDaily.ENERC_KCAL.quantity /
                      recipeInfo.yield
                    ).toFixed()}
                    %
                  </Text>
                  <Text fontSize={"sm"} color={"red.300"} align="center">
                    Daily Value
                  </Text>
                </Stack>
              )}
              <Stack flex={1} spacing={1} align={"center"}>
                <Text fontWeight={600}>{recipeInfo.yield}</Text>
                <Text fontSize={"sm"} color={"red.300"} align="center">
                  Servings
                </Text>
              </Stack>
            </Stack>
            <Divider orientation="horizontal" mt="1" mb="3" />
            <Text
              align="center"
              onClick={() => showRedirectAlert()}
              color={"red.400"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"md"}
              letterSpacing={1.1}
              cursor="pointer"
            >
              {recipeInfo.source} (For Instructions)
            </Text>
          </Stack>
          <Stack flex={2} spacing={{ base: 3, md: 3 }}>
            <Heading fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}>
              {recipeInfo.label}
            </Heading>
            <Box>
              <FavoriteButton iconOnly recipe={recipeInfo} />
              <CompareButton recipe={recipeInfo} />
            </Box>
            <Divider orientation="horizontal" mt="2" mb="3" />
            {recipeInfo.ingredients && (
              <Text
                fontWeight="700"
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
              >
                {recipeInfo.ingredients.length} Ingredients
              </Text>
            )}
            {recipeInfo.ingredientLines && (
              <OrderedList pl="4" fontSize={{ base: "sm", sm: "md", md: "lg" }}>
                {recipeInfo.ingredientLines.map(
                  (ing: string, index: number) => (
                    <ListItem mb="3" key={index}>
                      {ing}
                    </ListItem>
                  )
                )}
              </OrderedList>
            )}
            <Divider orientation="horizontal" mt="2" mb="3" />
            <Text
              fontWeight="700"
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
            >
              Meal Type
            </Text>
            {recipeInfo.mealType &&
              recipeInfo.mealType.map((meal: string, index: number) => (
                <Text key={index} fontSize={{ base: "sm", sm: "md", md: "lg" }}>
                  {meal}
                </Text>
              ))}
            <Divider orientation="horizontal" mt="2" mb="3" />
            <Text
              fontWeight="700"
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
            >
              Health Labels
            </Text>
            <Flex wrap="wrap" direction="row">
              {recipeInfo.healthLabels &&
                recipeInfo.healthLabels.map((label: string, index: number) => (
                  <Text
                    lign="left"
                    key={index}
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  >
                    {index > 0 && ", "}
                    {label}
                  </Text>
                ))}
            </Flex>
            <Divider orientation="horizontal" mt="2" mb="3" />
            <Text
              fontWeight="700"
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
            >
              Nutrition Facts
            </Text>
            {recipeInfo.digest && (
              <Table size="sm" fontSize={{ base: "sm", sm: "md", md: "lg" }}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Weight</Th>
                    <Th>Percent</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recipeInfo.digest.map((digest: any, index: number) => (
                    <Tr key={index}>
                      <Td>{digest.label}</Td>
                      <Td>
                        {(digest.total / recipeInfo.yield).toFixed()}
                        {digest.unit}
                      </Td>
                      <Td>{(digest.daily / recipeInfo.yield).toFixed()}%</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Stack>
        </Stack>
      )}
      {isRedirectAlert && (
        <RedirectAlert
          open={isRedirectAlert}
          sourceUrl={recipeInfo.url}
          toggle={() => setIsRedirectAlert(!isRedirectAlert)}
        />
      )}
    </Container>
  );
};

export default RecipeInfo;
