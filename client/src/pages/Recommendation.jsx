import React, { useState } from 'react';
import {
  Box, Flex, Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel, IconButton, Badge, SimpleGrid, Button, useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaBook, FaFileAlt, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  { id: 1, type: 'Book', label: 'Book', icon: FaBook, color: 'green', time: '15 min read' },
  { id: 2, type: 'Book', label: 'Book', icon: FaBook, color: 'green', time: '12 min read' },
  { id: 3, type: 'Book', label: 'Book', icon: FaBook, color: 'green', time: '20 min read' },
  { id: 4, type: 'Article', label: 'Article', icon: FaFileAlt, color: 'orange', time: '8 min read' },
  { id: 5, type: 'Article', label: 'Article', icon: FaFileAlt, color: 'orange', time: '6 min read' },
  { id: 6, type: 'Article', label: 'Article', icon: FaFileAlt, color: 'orange', time: '10 min read' },
  { id: 7, type: 'Video Course', label: 'Video Course', icon: FaVideo, color: 'red', time: '3h total' },
  { id: 8, type: 'Video Course', label: 'Video Course', icon: FaVideo, color: 'red', time: '4h total' },
  { id: 9, type: 'Video Course', label: 'Video Course', icon: FaVideo, color: 'red', time: '5h total' },
];

const tabTypes = [
  { label: 'All', filter: () => true },
  { label: 'Books', filter: (r) => r.type === 'Book' },
  { label: 'Articles', filter: (r) => r.type === 'Article' },
  { label: 'Courses', filter: (r) => r.type === 'Video Course' },
];

const Recommendation = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}>
      <Flex align="center" mb={6}>
        <IconButton
          icon={<ArrowBackIcon />} 
          aria-label="Return"
          variant="ghost"
          mr={2}
          onClick={() => navigate(-1)}
        />
        <Heading size="md" flex={1}>Reading Recommendations</Heading>
        <Button leftIcon={<SettingsIcon />} variant="ghost" colorScheme="gray" size="sm" ml={2}>
          Customize
        </Button>
      </Flex>
      <Heading size="lg" mb={6}>Recommended for You</Heading>
      <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled" colorScheme="blue">
        <TabList mb={4} borderBottom="1px solid #eee">
          {tabTypes.map((tab) => (
            <Tab key={tab.label} _selected={{ borderBottom: '2px solid #3182ce', color: 'blue.600' }}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabTypes.map((tab, idx) => (
            <TabPanel key={tab.label} px={0}>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 2 }} spacing={6}>
                {recommendations.filter(tab.filter).map((rec, i) => (
                  <Box
                    key={rec.id + '-' + i}
                    bg={cardBg}
                    borderRadius="lg"
                    boxShadow="md"
                    p={5}
                    borderWidth={1}
                    borderColor={border}
                    minH="140px"
                    display="flex"
                    alignItems="center"
                    gap={6}
                  >
                    <Box w="90px" h="135px" bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="md" display="flex" alignItems="center" justifyContent="center" fontSize="lg" color="gray.400" fontWeight="bold">
                      200 × 300
                    </Box>
                    <Box flex={1}>
                      <Badge colorScheme={rec.color} mb={2} px={2} py={1} borderRadius="md" fontSize="sm" display="inline-flex" alignItems="center">
                        {rec.icon && React.createElement(rec.icon, { style: { marginRight: 4 } })} {rec.label}
                      </Badge>
                      <Text color="gray.500" fontSize="sm" mb={1}>{rec.time}</Text>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Recommendation; 