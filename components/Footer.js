"use client"

import React from "react"
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  LuBuilding2,
  LuPhone,
  LuMail,
  LuMapPin,
  LuFacebook,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
  LuSend,
  LuHeart,
} from "react-icons/lu"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  popular: [
    { name: "Buy Properties", href: "/properties?type=buy" },
    { name: "Rent Properties", href: "/properties?type=rent" },
    { name: "Sell Property", href: "/sell" },
    { name: "Agent Directory", href: "/agents" },
  ],
}

const socialLinks = [
  { icon: LuFacebook, href: "#", label: "Facebook" },
  { icon: LuTwitter, href: "#", label: "Twitter" },
  { icon: LuInstagram, href: "#", label: "Instagram" },
  { icon: LuLinkedin, href: "#", label: "LinkedIn" },
]

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      borderTop="1px solid"
      borderColor="gray.200"
      mt="auto"
    >
      {/* Main Footer Content */}
      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={{ base: 8, md: 10 }}>
          {/* Company Info */}
          <VStack align="start" gap={4} gridColumn={{ lg: "span 2" }}>
            <Flex align="center" gap={2}>
              <Box
                p={2}
                bg="blue.600"
                borderRadius="lg"
                color="white"
              >
                <LuBuilding2 size={24} />
              </Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="blue.600"
                _dark={{ color: "blue.400" }}
              >
                EstateHub
              </Text>
            </Flex>
            <Text
              color="gray.600"
              _dark={{ color: "gray.400" }}
              fontSize="sm"
              lineHeight="tall"
              maxW="300px"
            >
              Your trusted partner in finding the perfect property. We help you
              discover your dream home with ease and confidence.
            </Text>
            <VStack align="start" gap={3} mt={2}>
              <Flex align="center" gap={2} color="gray.600" _dark={{ color: "gray.400" }}>
                <LuMapPin size={18} />
                <Text fontSize="sm">123 Real Estate Ave, New York, NY 10001</Text>
              </Flex>
              <Flex align="center" gap={2} color="gray.600" _dark={{ color: "gray.400" }}>
                <LuPhone size={18} />
                <Text fontSize="sm">+1 (555) 123-4567</Text>
              </Flex>
              <Flex align="center" gap={2} color="gray.600" _dark={{ color: "gray.400" }}>
                <LuMail size={18} />
                <Text fontSize="sm">info@estatehub.com</Text>
              </Flex>
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" gap={4}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              Quick Links
            </Text>
            {footerLinks.company.map((link) => (
              <Text
                key={link.name}
                as="a"
                href={link.href}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                _hover={{
                  color: "blue.600",
                  _dark: { color: "blue.400" },
                  transform: "translateX(4px)",
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                {link.name}
              </Text>
            ))}
          </VStack>

          {/* Support */}
          <VStack align="start" gap={4}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              Support
            </Text>
            {footerLinks.support.map((link) => (
              <Text
                key={link.name}
                as="a"
                href={link.href}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                _hover={{
                  color: "blue.600",
                  _dark: { color: "blue.400" },
                  transform: "translateX(4px)",
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                {link.name}
              </Text>
            ))}
          </VStack>

          {/* Newsletter */}
          <VStack align="start" gap={4}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              Stay Updated
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Subscribe to get the latest property listings and updates.
            </Text>
            <HStack w="full" gap={2}>
              <Input
                placeholder="Enter your email"
                size="md"
                bg="white"
                _dark={{ bg: "gray.800" }}
                border="1px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.500" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                }}
              />
              <IconButton
                aria-label="Subscribe"
                bg="blue.600"
                color="white"
                _hover={{ bg: "blue.700" }}
                _dark={{ bg: "blue.500", _hover: { bg: "blue.600" } }}
              >
                <LuSend size={18} />
              </IconButton>
            </HStack>

            {/* Social Media */}
            <HStack gap={2} mt={2}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  variant="outline"
                  size="sm"
                  borderColor="gray.300"
                  _dark={{ borderColor: "gray.600" }}
                  color="gray.600"
                  _hover={{
                    bg: "blue.600",
                    color: "white",
                    borderColor: "blue.600",
                    _dark: { bg: "blue.500", borderColor: "blue.500" },
                  }}
                >
                  <social.icon size={18} />
                </IconButton>
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <Box
        py={4}
        borderTop="1px solid"
        borderColor="gray.200"
        bg="gray.100"
        _dark={{ bg: "gray.800" }}
      >
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              © {new Date().getFullYear()} EstateHub. All rights reserved.
            </Text>
            <Flex align="center" gap={1} color="gray.600" _dark={{ color: "gray.400" }}>
              <Text fontSize="sm">Made with</Text>
              <LuHeart size={14} color="#E53E3E" fill="#E53E3E" />
              <Text fontSize="sm">for real estate enthusiasts</Text>
            </Flex>
            <HStack gap={4}>
              {footerLinks.popular.slice(0, 3).map((link) => (
                <Text
                  key={link.name}
                  as="a"
                  href={link.href}
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  _hover={{ color: "blue.600", _dark: { color: "blue.400" } }}
                  cursor="pointer"
                  transition="color 0.2s"
                >
                  {link.name}
                </Text>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer

