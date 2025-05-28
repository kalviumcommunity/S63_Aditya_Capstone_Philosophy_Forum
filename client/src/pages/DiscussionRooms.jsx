import React, { useState } from 'react';
import {
  Box, Flex, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Icon, HStack, Spacer
} from '@chakra-ui/react';
import { FaArrowLeft, FaUserFriends, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const discussionData = {
  Ethics: [
    {
      title: 'The Trolley Problem Revisited',
      description: 'Modern interpretations and variations of the classic ethical dilemma',
      time: '10:45',
      threads: 24,
    },
    {
      title: 'Moral Relativism vs Universal Ethics',
      description: 'Exploring the tension between cultural values and universal principles',
      time: '10:30',
      threads: 18,
    },
    {
      title: 'AI Ethics and Consciousness',
      description: 'Philosophical implications of artificial consciousness and moral agency',
      time: '09:15',
      threads: 31,
    },
  ],
  Metaphysics: [
    {
      title: 'The Nature of Reality',
      description: 'Debate on what is truly real and what is illusion',
      time: '11:00',
      threads: 12,
    },
  ],
  Stoicism: [
    {
      title: 'Stoic Practices in Modern Life',
      description: 'Applying ancient wisdom to contemporary challenges',
      time: '08:30',
      threads: 7,
    },
  ],
};

const categories = Object.keys(discussionData);

const DiscussionRooms = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bg="#fcf7ef" p={0}>
      <Box maxW="1200px" mx="auto" pt={8}>
        <Flex align="center" mb={6}>
          <Button leftIcon={<FaArrowLeft />} variant="ghost" colorScheme="gray" mr={2} onClick={() => navigate(-1)}>
            Return
          </Button>
          <Heading size="lg" color="blue.900">Discussion Rooms</Heading>
          <Spacer />
          <Button colorScheme="orange" rounded="md">Start New Discussion</Button>
        </Flex>
        <Box bg="white" rounded="xl" boxShadow="md" p={4}>
          <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled">
            <TabList mb={4}>
              {categories.map((cat) => (
                <Tab key={cat} fontWeight="semibold" _selected={{ color: 'blue.900', borderBottom: '2px solid #b8894a' }}>
                  {cat}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {categories.map((cat) => (
                <TabPanel key={cat} px={0}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {discussionData[cat].map((room, idx) => (
                      <Box key={idx} bg="#fcf7ef" p={5} rounded="lg" boxShadow="md" border="1px solid #ececec">
                        <Flex justify="space-between" align="center" mb={2}>
                          <Heading size="sm" color="blue.900">{room.title}</Heading>
                          <Text fontSize="xs" color="gray.400">{room.time}</Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.600" mb={3}>{room.description}</Text>
                        <HStack spacing={2} color="gray.500" fontSize="sm">
                          <Icon as={FaComments} />
                          <Text>{room.threads} threads</Text>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussionRooms; 