import { NavLink as RouteLink } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  IconButton,
  useDisclosure,
  Stack,
  Container,
  chakra,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { RecipesContext } from "../context/recipeContext";

type NavLinkProps = { text: string; routeTo: string; count?: number };
const NavLink = ({ text, routeTo, count }: NavLinkProps) => {
  const stringCount = "" + count;
  return (
    <Link
      exact
      activeStyle={{
        fontWeight: "bold",
        color: "yellow",
      }}
      as={RouteLink}
      color="white"
      px={2}
      py={1}
      fontSize="md"
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: "yellow",
      }}
      to={routeTo}
      pos={"relative"}
    >
      {text}

      {stringCount !== "undefined" && (
        <chakra.span
          ml={2}
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          lineHeight="none"
          color="red.800"
          transform="translate(50%,-50%)"
          bg="white"
          rounded="full"
        >
          {stringCount}
        </chakra.span>
      )}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { compareList, favorites, clearRecipeSearch } =
    useContext(RecipesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgGradient="linear(to-l, #9B2C2C, #E53E3E)" px={2}>
      <Container maxWidth="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text
                onClick={() => {
                  clearRecipeSearch();
                }}
                as={RouteLink}
                fontWeight="700"
                fontSize="lg"
                color="white"
                to="/"
              >
                Recipe Search Buddy
              </Text>
            </Box>
          </HStack>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink text="Search" routeTo="/" />
            <NavLink
              text="Favorites"
              routeTo="/favorites"
              count={favorites.length}
            />
            <NavLink
              text="Compare"
              routeTo="/compare"
              count={compareList.length}
            />
          </HStack>
        </Flex>
      </Container>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Container>
            <Stack as={"nav"} spacing={4} justify={"flex-end"}>
              <NavLink text="Search" routeTo="/" />
              <NavLink
                text="Favorites"
                routeTo="/favorites"
                count={favorites.length}
              />
              <NavLink
                text="Compare"
                routeTo="/compare"
                count={compareList.length}
              />
            </Stack>
          </Container>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
