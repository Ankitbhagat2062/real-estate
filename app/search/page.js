 "use client"
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  Chip,
  HStack,
  VStack,
  Skeleton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  useToast,
  Spinner
} from '@chakra-ui/react';
import NProgress from 'nprogress';
import { MdLocationOn, MdFilterList, MdOutlinePriceCheck } from 'react-icons/md';
import Link from 'next/link';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Property from '@/components/Property';
import { Button } from '@chakra-ui/react';
const searchFilters = {
    region_id: '30749',
    region_type: '6',
    sf: '1,2,3,5,6,7',
    uipt: '1,2,3,4,7,8',
    num_homes: '400',
    status: '9',
    max_listing_approx_size: '1',
    min_listing_approx_size: '1',
    max_parcel_size: '1',
    min_parcel_size: '1',
    max_price: '645000',
    min_price: '350000',
    max_price_per_sqft: '4565',
    min_price_per_sqft: '2998',
    max_stories: '3',
    min_stories: '1',
    max_year_built: '3',
    min_year_built: '1',
    num_baths: '4',
    num_beds: '4',
    pkg: '4',
    sold_within_days: '5',
    time_on_market_range: '3',
    open_house: '1',
    virtual_tour: 'true',
    excl_ar: 'true',
    rd: '7',
    excl_ss: 'true',
    excl_ll: 'true',
    fixer: 'true',
    pool_types: '1',
    include_outdoor_parking: 'true',
    rv_parking: 'true',
    ac: 'true',
    fireplace: 'true',
    primary_bed_on_main: 'true',
    wf: 'true',
    view: 'true',
    basement_types: '1',
    pets_allowed: 'true',
    wd: 'true',
    guest_house: 'true',
    accessible: 'true',
    elevator: 'true',
    green: 'true',
    walk_score: '30',
    transit_score: '30',
    bike_score: '30',
    school_rating: '8',
    school_types: 'Elementary',
    unrated_schools: 'true',
    hoa: '0',
    max_property_tax: '750'
};

const Search = () => {
  const params = useParams();
  const { status, uipt, region_id, region_type, sf } = params;
  const toast = useToast();

  // Merge params into filters
  const currentFilters = {
    ...searchFilters,
    ...(status && { status }),
    ...(uipt && { uipt }),
    ...(region_id && { region_id }),
    ...(region_type && { region_type }),
    ...(sf && { sf }),
  };

  const queryKey = ['properties', currentFilters];

const fetchProperties = async (currentFilters) => {
  // Add delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 1000));
  NProgress.start();
  try {
    const queryStr = new URLSearchParams(currentFilters).toString();
    const data = await fetchApi(`${baseUrl}/properties/list?${queryStr}`);
    return data?.homes || [];
  } finally {
    NProgress.done();
  }
};

const { data: properties = [], isLoading, isError, error, refetch } = useQuery({
  queryKey,
  queryFn: () => fetchProperties(currentFilters),
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 30,
  onError: (err) => {
    toast({
      title: 'Error loading properties',
      description: err.message || 'Please try again.',
      status: 'error',
      duration: 5000,
    });
  },
});

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  if (isError) {
    return (
      <Container maxW="7xl" py={20}>
        <VStack spacing={6} textAlign="center">
          <Text fontSize="xl" color={textColor}>Failed to load properties</Text>
          <Button onClick={() => refetch()} colorScheme="blue" size="lg">
            Retry
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="7xl">
        {/* Header */}
        <Breadcrumb separator={<Text color="gray.500">/</Text>} mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{region_id || 'Search'}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading mb={4} size="2xl">
          <Flex align="center" gap={3}>
            <MdLocationOn size={32} />
            Properties in your area
          </Flex>
        </Heading>
        <Text fontSize="lg" color={textColor} mb={12}>
          Found {properties.length} properties matching your search
        </Text>

        {/* Filters Chips */}
        <HStack wrap="wrap" spacing={2} mb={12} p={4} bg="white" rounded="xl" shadow="md">
          <Chip icon={<MdFilterList />}>
            Status: {status || searchFilters.status}
          </Chip>
          <Chip>Property Types: {uipt || searchFilters.uipt}</Chip>
          <Chip>Sources: {sf || searchFilters.sf}</Chip>
          <Chip>Price: ${searchFilters.min_price || 'Any'} - ${searchFilters.max_price || 'Any'}</Chip>
          <Chip icon={<MdOutlinePriceCheck />}>
            Beds: {searchFilters.num_beds || 'Any'}+
          </Chip>
        </HStack>

        {/* Properties Grid */}
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} height="400px" rounded="3xl" />
            ))}
          </SimpleGrid>
        ) : properties.length === 0 ? (
          <VStack py={20} spacing={6} textAlign="center">
            <Text fontSize="xl" color={textColor}>No properties found</Text>
            <Text color="gray.500">Try adjusting your filters or check back later</Text>
            <Button as={Link} href="/" colorScheme="blue">Browse All Homes</Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
            {properties.map((property) => (
              <Property key={property.property_id} property={property} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Search
