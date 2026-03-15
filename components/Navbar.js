"use client"

import React from "react"
import {
  Box,
  Flex,
  Container,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { ColorModeToggle } from "./color-mode-toggle"
import {
  LuX,
  LuSearch,
  LuMenu,
  LuBuilding2,
  LuInfo,
  LuPhone,
  LuUser,
  LuHouse,
} from "react-icons/lu"
import Link from "next/link"

const navLinks = [
  { name: "Home", href: "/", icon: LuHouse },
  { name: "Properties", href: "/properties", icon: LuBuilding2 },
  { name: "About", href: "/about", icon: LuInfo },
  { name: "Contact", href: "/contact", icon: LuPhone },
]

const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="nav"
      position="fixed"
      width={'100%'}
      top="0"
      zIndex="1000"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderBottom="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Container maxW="7xl" py={3}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="blue.600"
              _dark={{ color: "blue.400" }}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              EstateHub
            </Text>
          </Box>

          {/* Desktop Navigation - Shared HStack */}
          <HStack gap={8} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Text
                key={link.name}
                as="a"
                href={link.href}
                fontWeight="medium"
                color="gray.600"
                _dark={{ color: "gray.300" }}
                _hover={{
                  color: "blue.600",
                  _dark: { color: "blue.400" },
                }}
                transition="color 0.2s"
                cursor="pointer"
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "0%",
                  height: "2px",
                  bg: "blue.600",
                  _dark: { bg: "blue.400" },
                  transition: "width 0.2s",
                }}
                _hoverAfter={{
                  width: "100%",
                }}
              >
                {link.name}
              </Text>
            ))}
          </HStack>

          {/* Search and Theme Toggle - always visible */}
          <HStack gap={2} display={{ base: "flex", md: "flex" }} flexShrink={0}>
            <Link href={`/search?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=4`}>
              <IconButton
                aria-label="Search"
                variant="ghost"
                size={{ base: "sm", md: "md" }}
                color="gray.600"
                _dark={{ color: "gray.300" }}
                _hover={{
                  bg: "gray.100",
                  _dark: { bg: "gray.700" },
                }}
              >
                <LuSearch size={20} />
              </IconButton>
            </Link>
            <Box>
              <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                <ColorModeToggle />
              </ClientOnly>
            </Box>
          </HStack>
          {/* Right Side Actions Desktop */}
          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            <Button
              variant="outline"
              size="md"
              colorScheme="blue"
              _dark={{
                color: "blue.400",
                borderColor: "blue.400",
                _hover: { bg: "blue.400", color: "white" },
              }}
            >
              Sign In
            </Button>

            <Button
              size="md"
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.700" }}
              _dark={{
                bg: "blue.500",
                _hover: { bg: "blue.600" },
              }}
            >
              Register
            </Button>
          </HStack>

          {/* Mobile Right Side */}
          <HStack gap={2} display={{ base: "flex", md: "none" }}>
            <Link href={`/search?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=4`}>
              <IconButton
                aria-label="Search"
                variant="ghost"
                size="sm"
                color="gray.600"
                _dark={{ color: "gray.300" }}
              >
                <LuSearch size={20} />
              </IconButton>
            </Link>

            <Box>
              <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                <ColorModeToggle />
              </ClientOnly>
            </Box>

            <IconButton
              aria-label="Menu"
              variant="ghost"
              size="sm"
              onClick={open ? onClose : onOpen}
              color="gray.600"
              _dark={{ color: "gray.300" }}
            >
              {open ? <LuX size={24} /> : <LuMenu size={24} />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {open && (
          <Box
            display={{ base: "block", md: "none" }}
            mt={4}
            py={4}
            borderTop="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.700" }}
          >
            <VStack gap={4} align="stretch">
              {navLinks.map((link) => (
                <Flex
                  key={link.name}
                  as="a"
                  href={link.href}
                  align="center"
                  gap={3}
                  py={2}
                  px={3}
                  borderRadius="md"
                  color="gray.600"
                  _dark={{ color: "gray.300" }}
                  _hover={{
                    bg: "gray.100",
                    _dark: { bg: "gray.700" },
                    color: "blue.600",
                    _dark: { color: "blue.400" },
                  }}
                  transition="all 0.2s"
                  onClick={onClose}
                >
                  <link.icon size={20} />
                  <Text fontWeight="medium">{link.name}</Text>
                </Flex>
              ))}

              <Flex gap={3} mt={4}>
                <Button
                  flex={1}
                  variant="outline"
                  colorScheme="blue"
                  leftIcon={<LuUser />}
                  _dark={{
                    color: "blue.400",
                    borderColor: "blue.400",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  flex={1}
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  _dark={{
                    bg: "blue.500",
                    _hover: { bg: "blue.600" },
                  }}
                >
                  Register
                </Button>
              </Flex>
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Navbar

