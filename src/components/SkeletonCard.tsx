import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard: React.FC = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
      <Box h={"300px"} mt={-6} mx={-6}>
        <Skeleton height="300px" />
      </Box>
      <Box>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </Box>
  );
};

export default SkeletonCard;
