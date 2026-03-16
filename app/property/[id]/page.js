"use client"

import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Box, Flex, Grid, Heading, Text, Badge, VStack, HStack,
  Avatar, Button, Spinner,
  Accordion,
} from '@chakra-ui/react'

import NProgress from 'nprogress'
import { motion } from 'framer-motion'
import { MdLocationOn, MdExpandMore, MdEmail, MdPhone, MdPhotoLibrary } from 'react-icons/md'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { LuMoveLeft, LuMoveRight } from 'react-icons/lu'

import { baseUrl, fetchApi } from '@/utils/fetchApi'
import { getBackgroundImageUrl } from '@/lib/constant'
const MotionBox = motion.create(Box)
const MotionVStack = motion.create(VStack)
const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

// Arrow components for image carousel (from Property.js)
const LeftArrow = () => {
  const { isPrevVisible, scrollPrev } = React.useContext(VisibilityContext)
  return (
    <Box as={LuMoveLeft} size="6" cursor={isPrevVisible ? 'pointer' : 'not-allowed'}
      opacity={isPrevVisible ? 1 : 0.5} pos="absolute" left="4" top="50%"
      transform="translateY(-50%)" zIndex="10" bg="whiteAlpha.800"
      rounded="full" p="2" shadow="md" _dark={{ bg: 'gray.800' }}
      onClick={() => isPrevVisible && scrollPrev()} />
  )
}

const RightArrow = () => {
  const { isNextVisible, scrollNext } = React.useContext(VisibilityContext)
  return (
    <Box as={LuMoveRight} size="6" cursor={isNextVisible ? 'pointer' : 'not-allowed'}
      opacity={isNextVisible ? 1 : 0.5} pos="absolute" right="4" top="50%"
      transform="translateY(-50%)" zIndex="10" bg="whiteAlpha.800"
      rounded="full" p="2" shadow="md" _dark={{ bg: 'gray.800' }}
      onClick={() => isNextVisible && scrollNext()} />
  )
}

// Placeholder images
const getPlaceholderPhotos = (city = 'brooklyn') =>
  Array.from({ length: 8 }, (_, i) => getBackgroundImageUrl(city))

const fetchPropertyDetails = async (propertyId, listingId) => {
  NProgress.start()
  try {
    const url = `${baseUrl}/properties/get-main-info?propertyId=${propertyId}&listingId=${listingId}`
    const data = await fetchApi(url)
    NProgress.done()
    return data.payload || null
  } catch {
    NProgress.done()
    throw new Error('Failed to fetch property details')
  }
}

const PropertyDetailsPage = () => {
  const params = useParams()
  const searchParams = useSearchParams();
  const id = params?.id
  const listingId = searchParams.get('listingId');
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['propertyDetails', id, listingId],
    queryFn: () => fetchPropertyDetails(id, listingId),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: 2,
    enabled: !!id
  })
  
  const property = data || {}
  const { mainHouseInfo = {}, mediaBrowserInfo = {}, openHouseInfo = {} } = property
  const { propertyAddress = {}, selectedAmenities = [], marketingRemarks = [], listingAgents = [] } = mainHouseInfo
  const agent = listingAgents[0] || {}
  const address = `${propertyAddress.streetNumber} ${propertyAddress.streetName} ${propertyAddress.streetType} ${propertyAddress.directionalSuffix} ${propertyAddress.unitType} ${propertyAddress.unitValue}, ${propertyAddress.city}, ${propertyAddress.stateOrProvinceCode} ${propertyAddress.postalCode}`.trim()
  const photos = mediaBrowserInfo.scans?.length ? mediaBrowserInfo.scans : getPlaceholderPhotos(propertyAddress.city?.toLowerCase())

  if (error && !data) {
    console.error('Property fetch error:', error.message)
  }

  return (
    <Box minH="100vh" py={12} px={{ base: 4, md: 8 }} bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <MotionBox initial="hidden" animate="show" variants={stagger}>
        {/* Hero Image Gallery */}
        <Box pos="relative" mb={12}>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {photos.map((src, i) => (
              <MotionBox key={i} whileHover={{ scale: 1.05 }} maxW="800px" mx={2} flexShrink={0} rounded="3xl" overflow="hidden" shadow="2xl">
                <Box as="img" src={src} w="full" h={96} objectFit="cover" />
              </MotionBox>
            ))}
          </ScrollMenu>
          <HStack pos="absolute" top={6} left={6} spacing={2}>
            <Badge colorScheme="green" px={4} py={2}>Condo</Badge>
            {!mainHouseInfo.propertyIsActivish && <Badge colorScheme="orange">Off Market</Badge>}
          </HStack>
        </Box>

        {/* Main Content Card */}
        <MotionBox bg={ `white`} _dark={{bg:`gray.800`}} rounded="3xl" shadow="2xl" p={{ base: 8, lg: 12 }} maxW="6xl" mx="auto" variants={fadeInUp}>
          {/* Address & Icons */}
          <Flex align="center" mb={8} pb={8} borderBottom="1px" borderColor={'gray.200'} _dark={{borderColor:'gray.700'}}>
            <Box as={MdLocationOn} color="blue.500" boxSize={8} mr={4} />
            <VStack align="start" flex={1}>
              <Heading size={{ base: '2xl', md: '3xl' }}>{address || 'Luxury Property Details'}</Heading>
              <Text fontSize="lg" color="gray.500">MLS# 457846 • Built 2000 • Brooklyn, NY</Text>
            </VStack>
          </Flex>

          {/* Details Grid */}
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6} mb={12}>
            {selectedAmenities.map((amenity, i) => (
              <MotionVStack key={amenity.content} align="start" p={6} bg="gray.50" rounded="2xl" _dark={{ bg: 'gray.700' }} variants={fadeInUp}>
                <Heading size="md" color="gray.600">{amenity.header}</Heading>
                <Text fontSize="2xl" fontWeight="extrabold">{amenity.content}</Text>
              </MotionVStack>
            ))}
          </Grid>

          {/* Description */}
          {marketingRemarks.length > 0 && (
            <Accordion.Root allowmultiple={'true'} mb={12} defaultindex={[0]}>
              <Accordion.Item border="1px" borderColor={'gray.200'} _dark={{borderColor:'gray.700'}} rounded="2xl" overflow="hidden">
                <h2>
                  <Accordion.ItemContent p={6}>
                    <Box as={MdExpandMore} mr={3} />
                    <Text fontWeight="bold" flex="1" textAlign="left">Property Description</Text>
                    <Accordion.ItemBody />
                  </Accordion.ItemContent>
                </h2>
                <Accordion.ItemIndicator pb={8} whiteSpace="pre-wrap" fontSize="lg">{marketingRemarks[0].marketingRemark}</Accordion.ItemIndicator>
              </Accordion.Item>
            </Accordion.Root>
          )}

          {/* Agent Section */}
          {agent.agentInfo && (
            <MotionBox variants={fadeInUp} mb={12}>
              <Heading size="lg" mb={6}>Listing Agent</Heading>
              <Flex align="center" gap={6} p={8} bg="blue.50" rounded="3xl" _dark={{ bg: 'blue.900/20' }}>
                <Avatar.Root size={'xl'}>
                  <Avatar.Fallback name={agent?.agentInfo?.agentName} />
                  <Avatar.Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" />
                </Avatar.Root>
                <VStack align="start" flex={1}>
                  <Heading size="md">{agent.agentInfo.agentName}</Heading>
                  <Text fontSize="lg" color="gray.600">{agent.brokerName}</Text>
                </VStack>
                <HStack>
                  <Button leftIcon={<MdEmail />} colorScheme="blue" variant="outline">Email</Button>
                  <Button leftIcon={<MdPhone />} colorScheme="blue">Call</Button>
                </HStack>
              </Flex>
            </MotionBox>
          )}

          {/* CTA */}
          <Flex justify="center" pt={12} borderTop="1px" borderColor={'gray.200'} _dark={{borderColor:'gray.700'}}>
            <Button size="lg" colorScheme="blue" leftIcon={<MdPhotoLibrary />} onClick={() => refetch()}>
              {isLoading ? <Spinner size="sm" mr={2} /> : 'Refresh Details'}
            </Button>
          </Flex>
        </MotionBox>
      </MotionBox>

      {isLoading && (
        <Flex justify="center" mt={20}>
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  )
}

export default PropertyDetailsPage
