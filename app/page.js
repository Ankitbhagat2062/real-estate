"use client"

import { baseUrl, fetchApi } from "@/utils/fetchApi";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Property from "@/components/Property";

const Banner = ({ imageUrl, purpose, title1, title2, desc1, desc2, linkName, buttonText }) => (
  <Flex flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} m={10}>
    <Image src={imageUrl} width={500} height={300} style={{ width: 'auto' }} loading={'eager'} alt="banner" />
    <Box p={5}>
      <Text color={`gray.500`} fontSize={`sm`} fontWeight={`medium`}>{purpose}</Text>
      <Text fontSize={`3xl`} fontWeight={`bold`}>{title1} <br /> {title2} </Text>
      <Text color={`gray.700`} fontSize={`lg`} paddingY={3}>{desc1} <br /> {desc2} </Text>
      <Button fontSize={`xl`} >
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

// Fetch function for sale properties
const fetchSaleProperties = async () => {
  const data = await fetchApi(`${baseUrl}/properties/list?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=3&num_homes=25`);
  return data?.homes || [];
};

// Fetch function for rent properties
const fetchRentProperties = async () => {
  // Add delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data = await fetchApi(`${baseUrl}/properties/list?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=2,4&num_homes=25`);
  return data?.homes || [];
};

export default function Home() {
  // Use useQuery to fetch and cache properties data
  // Data will be cached for 5 minutes (staleTime) and reused on subsequent renders
  const { data: saleProperties = [], isLoading: saleLoading } = useQuery({
    queryKey: ['saleProperties'],
    queryFn: fetchSaleProperties,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: rentProperties = [], isLoading: rentLoading } = useQuery({
    queryKey: ['rentProperties'],
    queryFn: fetchRentProperties,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
  return (
    <div className={`min-h-screen font-sans dark:bg-background`}>
      <Banner
        purpose={`Rent A Home`}
        title1={`Rent Homes for`}
        title2={'Everyone'}
        desc1={'Explore Apartments , villas , Home'}
        desc2={' and more'}
        buttonText={'Explore Renting'}
        linkName={'/search?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=4'}
        imageUrl={'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'}
      />
      <Flex flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
        {rentLoading ? (
          <Text>Loading...</Text>
        ) : (
          rentProperties.map((property ,i) => <Property key={property?.homeData?.propertyId || i} property={property?.homeData} />)
        )}
      </Flex>
      <Banner
        purpose={`BUY A Home`}
        title1={`Find , Buy and Own Your`}
        title2={'Dream Home'}
        desc1={'Explore Apartments , villas , Home'}
        desc2={' and more'}
        buttonText={'Explore Buying'}
        linkName={'/search?status=1&uipt=1,2,3&region_id=30749&region_type=6&sf=3'}
        imageUrl={'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'}
      />
      <Flex flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
        {saleLoading ? (
          <Text>Loading...</Text>
        ) : (
          saleProperties.map((property , i) => <Property key={property?.homeData?.propertyId || i} property={property?.homeData} />)
        )}
      </Flex>
    </div>
  );
}

