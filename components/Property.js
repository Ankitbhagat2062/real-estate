import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react'

import { Card } from '@chakra-ui/react'

import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import millify from 'millify'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { getBackgroundImageUrl, getImageUrl } from '@/utils/searchFilters'
import Link from 'next/link'

const Property = ({ property }) => {
  !property?.photosInfo?.photoRanges && console.log(`hello`);
  const images = Array.from({ length: property.photosInfo?.photoRanges ? property.photosInfo.photoRanges[0]?.endPos : 0 }, (_, i) => getImageUrl(property, i))
  const bgImage = getBackgroundImageUrl(property);
  const primaryImage = images[0]
  const price = property.priceInfo?.homePrice?.int64Value?.toLocaleString() || 'N/A'
  const beds = property.beds?.value || 0
  const baths = property.baths?.value || 0
  const sqft = millify(property.sqftInfo?.amount?.value || 0)
  const address = `${property.addressInfo?.formattedStreetLine}, ${property.addressInfo?.city}, ${property.addressInfo?.state} ${property.addressInfo?.zip}`
  const yearBuilt = property.yearBuilt?.yearBuilt?.value || 'N/A'
  const dom = property.daysOnMarket?.daysOnMarket?.daysOnMarket?.value || 0
  const color = useColorModeValue("gray.800", "white");
  return (
    <Link href={`/property/${property?.propertyId}?listingId=${property?.listingId.value}`}>
      <Card.Root maxW="sm" minW="300px" mx="auto" boxShadow="xl" borderRadius="xl" overflow="hidden" 
      bg={`white`} _dark={{bg:'gray.800'}}>
        {/* Sashes */}
        <HStack p={3} bgGradient="linear(to-r, blue.500, purple.500)" justify="flex-start" spacing={2} wrap="wrap">
          {property.sashes?.map((sash, idx) => (
            <Badge key={idx} colorScheme={sash.sashTypeName === "Open House" ? "green" : "purple"} fontWeight="bold">
              {sash.sashTypeName}
            </Badge>
          ))}
        </HStack>

        {/* Hero Image */}
        <motion.div whileHover={{ scale: 1.02 }} style={{ overflow: "hidden" }}>
          <Image src={primaryImage} alt="Property" w="100%" h={64} objectFit="cover" />
          {/* Simple dots for carousel */}
          <HStack justify="center" p={2} spacing={1}>
            {images.slice(0, 8).map((_, idx) => (
              <Box key={idx} w={3} h={3} borderRadius="full" bg={idx === 0 ? "blue.500" : "gray.300"} />
            ))}
          </HStack>
        </motion.div>

        <Card.Body p={4}>
          {/* Price, Beds/Baths/Sqft */}
          <Flex align="center" justify="space-between" mb={4}>
            <Badge colorScheme="green" fontSize="2xl" px={4} py={2} fontWeight="bold">
              ${price}
            </Badge>
          </Flex>

          <HStack mb={4} spacing={4} color="gray.600">
            <HStack><Icon as={FaBed} color="blue.500" /><Text>{beds} beds</Text></HStack>
            <HStack><Icon as={FaBath} color="purple.500" /><Text>{baths} baths</Text></HStack>
            <HStack><Icon as={FaRulerCombined} color="orange.500" /><Text>{sqft}</Text></HStack>
          </HStack>

          {/* Address */}
          <Heading size="lg" mb={2} color={`${color}`}>
            <Icon as={FaMapMarkerAlt} boxSize={5} color="red.500" mb={1} display="block" />
            {address}
          </Heading>

          {/* Details Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mt={6}>
            <VStack align="start" p={3} bg="gray.50" _dark={{bg:'gray.800'}} borderRadius="md">
              <Text fontWeight="bold" color="gray.600">Year Built</Text>
              <Text fontSize="lg">{yearBuilt}</Text>
            </VStack>
            <VStack align="start" p={3} bg="gray.50" _dark={{bg:'gray.800'}} borderRadius="md">
              <Text fontWeight="bold" color="gray.600">Days on Market</Text>
              <Text fontSize="lg">{dom} days</Text>
            </VStack>
          </SimpleGrid>
        </Card.Body>

        <Card.Footer p={4} bg="gray.50" _dark={{bg:'gray.800'}}>
          <VStack w="full" align="start" spacing={2}>
            <Text fontWeight="bold">Listed by {property.brokers?.listingBrokerAndAgent?.agentName}</Text>
            {property.openHouses?.[0] && (
              <Badge colorScheme="orange">
                Open House: Sun, check time
              </Badge>
            )}
          </VStack>
        </Card.Footer>
      </Card.Root>
    </Link>
  )
}

export default Property
