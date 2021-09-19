import { Container, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

import React from "react";

const RecipeInfoSkeleton: React.FC = () => {
  return (
    <Container maxW="container.xl">
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={10}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 5 }}>
          <Skeleton height="300px" />
        </Stack>
        <Stack flex={2} spacing={{ base: 3, md: 3 }}>
          <SkeletonText mt="4" noOfLines={20} spacing="4" />
        </Stack>
      </Stack>
    </Container>
  );
};

export default RecipeInfoSkeleton;
