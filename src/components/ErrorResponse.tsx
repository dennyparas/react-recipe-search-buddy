import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const ErrorResponse: React.FC = () => {
  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 3, md: 5 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading fontWeight={600} fontSize={"2xl"} lineHeight={"110%"}>
        Sorry, we’re unable to process your request.
      </Heading>
      <Text pt="3" color={"red.400"}>
        Please try again later.
      </Text>
    </Stack>
  );
};

export default ErrorResponse;
