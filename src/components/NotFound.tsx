import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 3, md: 5 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading fontWeight={600} fontSize={"2xl"} lineHeight={"110%"}>
        We couldn't find any matches for your search query
      </Heading>
      <Text color={"red.400"}>
        Double check your search for any typos or spelling errors - or try a
        different search term.
      </Text>
    </Stack>
  );
};

export default NotFound;
