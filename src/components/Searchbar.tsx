import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Container,
  FormControl,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  CloseButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Searchbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const handleClearSearch = () => setSearchQuery("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Box
      px={4}
      w="100%"
      bg="red.50"
      borderBottomWidth="1px"
      borderBottomColor="red.100"
    >
      <Container maxW="container.md">
        <form onSubmit={handleSearch}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box flexBasis={{ base: "90%", md: "65%" }} mr="2">
              <InputGroup>
                <Input
                  bg="white"
                  type="text"
                  value={searchQuery}
                  placeholder="Search Recipe"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputRightElement width="2.5rem">
                  {searchQuery && (
                    <CloseButton px="0" size="sm" onClick={handleClearSearch} />
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box flexBasis={{ base: "0%", md: "25%" }} mr="2">
              <FormControl display={{ base: "none", md: "flex" }}>
                <Select
                  bg="white"
                  placeholder="Meal Type (All)"
                  isDisabled={!searchQuery}
                  onChange={(e) => setMealType(e.target.value)}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snack">Snack</option>
                  <option value="Teatime">Teatime</option>
                </Select>
              </FormControl>
            </Box>
            <Box flexBasis={"10%"} mr="2">
              <IconButton
                type="submit"
                aria-label="Search Recipe"
                bg="red.600"
                colorScheme="red"
                _hover={{
                  bg: "red.700",
                }}
                icon={<SearchIcon />}
              >
                Search
              </IconButton>
            </Box>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default Searchbar;
