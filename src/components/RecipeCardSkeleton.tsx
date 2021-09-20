import React from "react";
import { Box, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";

type SkeletonProps = {
  length: number;
};
const RecipeCardSkeleton: React.FC<SkeletonProps> = ({ length }) => {
  return (
    <SimpleGrid
      pt="4"
      pb="6"
      columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: 2, sm: 7 }}
    >
      {Array.from({ length: length }, (_, i) => (
        <Box
          key={i}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
        >
          <Box h={{ base: "150px", md: "300px" }} mt={-6} mx={-6}>
            <Skeleton height={{ base: "150px", sm: "300px" }} />
          </Box>
          <Box>
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RecipeCardSkeleton;
