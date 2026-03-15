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
  HStack,
  VStack,
  Skeleton,
  Breadcrumb,
  Tag,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import NProgress from 'nprogress';
import { MdLocationOn, MdFilterList, MdOutlinePriceCheck } from 'react-icons/md';
import Link from 'next/link';

import { Toaster, toaster } from "@/components/ui/toaster"
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Property from '@/components/Property';
import { searchFilters } from '@/lib/constant';
import SearchFilter from '@/components/searchFilter';

const Search = () => {
  const params = useParams();
  const { status, uipt, region_id, region_type, sf } = params;
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
      const data = await fetchApi(`${baseUrl}/properties/list?status=${currentFilters.status}&uuip=${currentFilters.uuipt}&region_type=${currentFilters.region_type}&region_id=${currentFilters.region_id}&sf=${currentFilters.sf}&num_homes=25`);
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
      toaster.create({
        title: 'Error loading properties',
        description: err.message || 'Please try again.',
        type: 'error',
        duration: 5000,
      });
    },
  });

  if (isError) {
    return (
      <>
        <Toaster />
        <Container maxW="7xl" py={20}>
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xl" color={'gray.700'} _dark={{ color: 'gray.300' }}>Failed to load properties</Text>
            <Button onClick={() => refetch()} colorScheme="blue" size="lg">
              Retry
            </Button>
          </VStack>
        </Container>
      </>
    );
  }
  // console.log(properties , currentFilters.status);
  return (
    <Box bg={'gray.50'} _dark={{ bg: 'gray.900' }} minH="100vh" py={12}>
      <Container maxW="7xl">
        {/* Header */}
        <Breadcrumb.Root mb="8">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link href="/">Home</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator>
              <Text color="gray.500">/</Text>
            </Breadcrumb.Separator>

            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>
                {region_id || 'Search'}
              </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <Heading mb={4} size="2xl">
          <Flex align="center" gap={3}>
            <MdLocationOn size={32} />
            Properties in your area
          </Flex>
        </Heading>
        <Text fontSize="lg" color={'gray.700'} _dark={{ color: 'gray.300' }} mb={12}>
          Found {properties.length} properties matching your search
        </Text>

        {/* Filters Chips */}
        <HStack wrap="wrap" spacing={2} mb={12} p={4} bg="white" rounded="xl" shadow="md">
          <Tag.Root size="lg" variant="subtle">
            <Tag.StartElement>
              <MdFilterList />
            </Tag.StartElement>
            <Tag.Label>Status: {status || searchFilters.status}</Tag.Label>
          </Tag.Root>

          <Tag.Root size="lg" variant="subtle">
            <Tag.Label>Property Types: {uipt || searchFilters.uipt}</Tag.Label>
          </Tag.Root>

          <Tag.Root size="lg" variant="subtle">
            <Tag.Label>Sources: {sf || searchFilters.sf}</Tag.Label>
          </Tag.Root>

          <Tag.Root size="lg" variant="subtle">
            <Tag.Label>
              Price: ${searchFilters.min_price || 'Any'} - ${searchFilters.max_price || 'Any'}
            </Tag.Label>
          </Tag.Root>

          <Tag.Root size="lg" variant="subtle">
            <Tag.StartElement>
              <MdOutlinePriceCheck />
            </Tag.StartElement>
            <Tag.Label>Beds: {searchFilters.num_beds || 'Any'}+</Tag.Label>
          </Tag.Root>
        </HStack>

        <SearchFilter />

        {/* Properties Grid */}
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} height="400px" rounded="3xl" />
            ))}
          </SimpleGrid>
        ) : properties.length === 0 ? (
          <VStack py={20} spacing={6} textAlign="center">
            <Text fontSize="xl" color={'gray.700'} _dark={{ color: 'gray.300' }}>No properties found</Text>
            <Text color="gray.500">Try adjusting your filters or check back later</Text>
            <Button as={Link} href="/" colorScheme="blue">Browse All Homes</Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={'10px'} spacing={8}>
            {properties.map((property ,i) => (
              <Property key={i} property={property.homeData} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Search
