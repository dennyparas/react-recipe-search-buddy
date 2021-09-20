import React from "react";
import { Box, Container, Center } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      px={4}
      py={2}
      mt={2}
      w="100%"
      borderBottomWidth="1px"
      borderBottomColor="red.100"
    >
      <Container maxW="container.md">
        <Center>
          <div id="edamam-badge" data-color="transparent"></div>
        </Center>
      </Container>
    </Box>
  );
};

export default Footer;
