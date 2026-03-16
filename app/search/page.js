"use client"
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
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
import { MdLocationOn } from 'react-icons/md';
import Link from 'next/link';

import { Toaster, toaster } from "@/components/ui/toaster"
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Property from '@/components/Property';
import { searchFilters } from '@/lib/constant';
import SearchFilter from '@/components/searchFilter';

const Search = () => {
  const params = useParams();
  const router = useRouter()
  const searchParams = useSearchParams();

  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const initialFilters = { ...searchParamsObj };

  const [currentFilters, setCurrentFilters] = useState(initialFilters);

  // Sync state with URL changes (back/forward)
  useEffect(() => {
    const newFilters = { ...searchParamsObj };
    setCurrentFilters(newFilters);
  }, [searchParamsObj]);

  const queryKey = ['properties', currentFilters];

  const fetchProperties = async (currentFilters) => {
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    NProgress.start();
    try {
      const queryObj = {
        status: currentFilters.status,
        uipt: currentFilters.uipt,
        region_type: currentFilters.region_type,
        region_id: currentFilters.region_id,
        sf: currentFilters.sf,
      };
      const queryStr = new URLSearchParams(
        Object.fromEntries(Object.entries(queryObj).filter(([, v]) => v))
      ).toString();
      const data = await fetchApi(`${baseUrl}/properties/list?${queryStr}&num_homes=25`);

      // Fixed: Dynamic essential params only, skips undefined, corrected API param name to 'uipt'
      return data?.homes || [];
    } finally {
      NProgress.done();
    }
  };

  const { data: properties = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchProperties(currentFilters),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    onError: (err) => {
      toaster.create({
        title: 'Error loading properties',
        description: err.message || 'Please try again.',
        type: 'error',
        duration: 5000,
      });
    },
  });

  const updateURL = useCallback((filters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null && value !== searchFilters[key]) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : '/search', { scroll: false });
  }, [router, searchParams]);

  const handleFiltersChange = useCallback((newFilters) => {
    setCurrentFilters(newFilters);
    updateURL(newFilters);
  }, [updateURL]);

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
                {searchParams.region_id || 'Search'}
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

        <SearchFilter
          initialFilters={currentFilters}
          onFilterChange={handleFiltersChange}
        />

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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} m={'10px'} gap={'10px'} spacing={8}>
            {properties.map((property, i) => (
              <Property key={i} property={property.homeData} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Search
