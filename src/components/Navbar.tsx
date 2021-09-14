import { Link as RouteLink } from "react-router-dom";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

type NavLinkProps = { text: string };
const NavLink = ({ text }: NavLinkProps) => (
  <Link
    color="white"
    px={2}
    py={1}
    fontSize="md"
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "orange.300",
    }}
  >
    {text}
  </Link>
);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgGradient="linear(to-l, #9B2C2C, #E53E3E)" px={4}>
      <Container maxWidth="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontWeight="700" fontSize="lg" color="white">
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
            <RouteLink to="/">
              <NavLink text="Search" />
            </RouteLink>
            <RouteLink to="/favorites">
              <NavLink text="Favorites" />
            </RouteLink>
          </HStack>
        </Flex>
      </Container>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Container>
            <Stack as={"nav"} spacing={4} justify={"flex-end"}>
              <RouteLink to="/">
                <NavLink text="Search" />
              </RouteLink>
              <RouteLink to="/favorites">
                <NavLink text="Favorites" />
              </RouteLink>
            </Stack>
          </Container>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
