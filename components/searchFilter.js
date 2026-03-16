import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  HStack,
  Select,
  NumberInput,
  Switch,
  CheckboxGroup,
  Checkbox,
  Accordion,
  Icon,
  Grid,
  GridItem,
  Text,
  Heading,
  Field,
  createListCollection,
  Portal
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa'; // Adjust icons as needed
import { OPTIONS, FILTER_GROUPS } from '@/lib/constant';
import { LuChevronDown } from 'react-icons/lu';

const SearchFilter = ({ initialFilters = {}, onFilterChange = () => { }, ...props }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = useCallback((key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  const renderInput = (filterKey) => {
    const value = filters[filterKey];
    const isRange = filterKey.includes('min_') || filterKey.includes('max_');
    const pairKey = isRange ? filterKey.replace(/min|max|min_|max_/, filterKey.includes('min') ? 'max' : 'min') : null;
    if (OPTIONS[filterKey]) {
      let items = [];
      OPTIONS[filterKey].map(opt => { items.push({ label: opt.label, value: opt.value }) })
      const frameworks = createListCollection({ items: items });
      return (
        <Select.Root collection={frameworks} size="sm" width="320px">
          <Select.HiddenSelect />
          <Select.Label>Select Region Type</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select Region Type" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {frameworks.items.map((framework) => (
                  <Select.Item item={framework} key={framework.value}>
                    {framework.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      );
    }

    if (filterKey === 'sf' || filterKey === 'uipt') {
      // Multi select simulation with CheckboxGroup
      const options = OPTIONS[filterKey] || [];
      return (
        <CheckboxGroup value={value ? value.split(',') : []} onChange={(vals) => handleChange(filterKey, vals.join(','))}>
          <HStack spacing={2} wrap="wrap">
            {options.map(opt => (
              <Checkbox key={opt.value} value={opt.value}>{opt.label}</Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      );
    }

    if (['true', 'false'].includes(value) || filterKey.includes('excl_') || filterKey.includes('true')) {
      return (
        <>
          <Switch.Root>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label>Activate Chakra</Switch.Label>
          </Switch.Root>
        </>
      );
    }

    if (isRange && pairKey && filters[pairKey] !== undefined) {
      return (
        <HStack gap="2">
          <NumberInput.Root
            flex="1"
            min={0} 
            value={value?.toString() || ""}
            onValueChange={(details) => handleChange(filterKey, details.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>

          <Text fontSize="sm" color="fg.muted">to</Text>

          <NumberInput.Root
            flex="1"
            min={0}
            value={filters[pairKey]?.toString() || ""}
            onValueChange={(details) => handleChange(pairKey, details.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
        </HStack>
      );
    }

    return (
      <NumberInput.Root
        value={value?.toString() || ""}
        onValueChange={(details) => handleChange(filterKey, details.value)}
        min={0}
      >
        <NumberInput.Control>
          <NumberInput.DecrementTrigger />
          <NumberInput.Input />
          <NumberInput.IncrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
    );
  };

  return (
    <Box
      p={6}
      bg={'white'}
      _dark={{ bg: 'gray.800', shadow: 'dark-lg' }}
      shadow={'md'}
      borderRadius="xl"
      borderWidth={1}
      {...props}
    >
      <Heading size="lg" mb={6} textAlign="center">
        <Icon as={FaSearch} boxSize={8} mr={3} display="inline" />
        Advanced Search Filters
      </Heading>
      <Accordion.Root
        defaultValue={["0"]} // defaultIndex is now defaultValue (strings)
        multiple // allowMultiple is now 'multiple'
        collapsible // allowToggle is now 'collapsible'
      >
        {FILTER_GROUPS.map(({ title, icon: IconComp, filters }, index) => (
          <Accordion.Item key={title} value={index.toString()} mb="4">
            <Accordion.ItemTrigger
              cursor="pointer"
              _hover={{ bg: "gray.100", _dark: { bg: "whiteAlpha.100" } }}
              py="3"
              px="4"
            >
              <Box display="flex" flex="1" alignItems="center" textAlign="left">
                <IconComp style={{ marginRight: '12px', width: '24px', height: '24px' }} />
                <Text fontWeight="medium">{title}</Text>
              </Box>
              <Accordion.ItemIndicator>
                <LuChevronDown />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Box pb="4" pt="2">
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap="4"
                >
                  {filters.map((key) => (
                    <Field.Root key={key} asChild>
                      <GridItem>
                        <Field.Label fontSize="sm" fontWeight="medium" mb="2">
                          {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Field.Label>
                        {renderInput(key)}
                      </GridItem>
                    </Field.Root>
                  ))}
                </Grid>
              </Box>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  );
};

export default SearchFilter;

