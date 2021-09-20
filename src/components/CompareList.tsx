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
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";
import fallbackImg from "./../assets/300x300-default.png";
import CompareButton from "./CompareButton";

const CompareListContainer: React.FC = () => {
  const { compareList } = useContext(RecipesContext);
  return (
    <Container maxW="container.xl">
      {compareList.length === 0 && (
        <Box mt="10">
          <Center>
            <Text
              align="center"
              fontWeight="700"
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="black"
            >
              You don't have any recipes to compare. <br />
              Please search a recipe and tap the Add to compare button.
            </Text>
          </Center>
        </Box>
      )}
      {compareList.length > 0 && (
        <Box mt="4">
          <Text
            fontWeight="700"
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color="black"
          >
            You can only compare up to 3 recipes.
          </Text>
        </Box>
      )}
      <SimpleGrid
        pt="4"
        pb="6"
        columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={{ base: 2, sm: 7 }}
      >
        {compareList &&
          compareList.map((recipe: any, index: number) => (
            <Stack key={index} flex={1} spacing={{ base: 3, md: 4 }} pb="5">
              <Box>
                <CompareButton recipe={recipe.recipe} />
              </Box>
              <Box pos={"relative"}>
                <Image
                  loading="eager"
                  w={"full"}
                  src={recipe.recipe.image}
                  objectFit={"cover"}
                  alt={recipe.recipe.label}
                  fallbackSrc={fallbackImg}
                />
              </Box>
              <Divider orientation="horizontal" mt="1" mb="3" />
              <Stack direction={"row"} justify={"center"} spacing={9}>
                <Stack flex={1} spacing={1} align={"center"}>
                  <Text fontWeight={600}>
                    {(recipe.recipe.calories / recipe.recipe.yield).toFixed()}
                  </Text>
                  <Text fontSize={"sm"} color={"red.300"} align="center">
                    Calories per Serving
                  </Text>
                </Stack>
                {recipe.recipe.totalDaily && (
                  <Stack flex={1} spacing={1} align={"center"}>
                    <Text fontWeight={600}>
                      {(
                        recipe.recipe.totalDaily.ENERC_KCAL.quantity /
                        recipe.recipe.yield
                      ).toFixed()}
                      %
                    </Text>
                    <Text fontSize={"sm"} color={"red.300"} align="center">
                      Daily Value
                    </Text>
                  </Stack>
                )}
                <Stack flex={1} spacing={1} align={"center"}>
                  <Text fontWeight={600}>{recipe.recipe.yield}</Text>
                  <Text fontSize={"sm"} color={"red.300"} align="center">
                    Servings
                  </Text>
                </Stack>
              </Stack>
              <Divider orientation="horizontal" mt="1" mb="3" />
              <Heading fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}>
                {recipe.recipe.label}
              </Heading>

              <Divider orientation="horizontal" mt="2" mb="3" />
              {recipe.recipe.ingredients && (
                <Text
                  fontWeight="700"
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                >
                  {recipe.recipe.ingredients.length} Ingredients
                </Text>
              )}
              {recipe.recipe.ingredientLines && (
                <OrderedList
                  pl="4"
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                >
                  {recipe.recipe.ingredientLines.map(
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
              {recipe.recipe.mealType &&
                recipe.recipe.mealType.map((meal: string, index: number) => (
                  <Text
                    key={index}
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  >
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
                {recipe.recipe.healthLabels &&
                  recipe.recipe.healthLabels.map(
                    (label: string, index: number) => (
                      <Text
                        lign="left"
                        key={index}
                        fontSize={{ base: "sm", sm: "md", md: "lg" }}
                      >
                        {index > 0 && ", "}
                        {label}
                      </Text>
                    )
                  )}
              </Flex>
              <Divider orientation="horizontal" mt="2" mb="3" />
              <Text
                fontWeight="700"
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
              >
                Nutrition Facts
              </Text>
              {recipe.recipe.digest && (
                <Table size="sm" fontSize={{ base: "sm", sm: "md", md: "lg" }}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Weight</Th>
                      <Th>Percent</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipe.recipe.digest.map((digest: any, index: number) => (
                      <Tr key={index}>
                        <Td>{digest.label}</Td>
                        <Td>
                          {(digest.total / recipe.recipe.yield).toFixed()}
                          {digest.unit}
                        </Td>
                        <Td>
                          {(digest.daily / recipe.recipe.yield).toFixed()}%
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Stack>
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default CompareListContainer;
