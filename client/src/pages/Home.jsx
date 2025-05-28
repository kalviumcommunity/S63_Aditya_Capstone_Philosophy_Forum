import React from 'react';
import {
  Box, Flex, Heading, Text, Button, useColorModeValue, Spacer, Image, Badge, IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import TypeShitImg from '../assets/Type shit.png';

const Home = () => {
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();

  // Simulate setting guest mode (could use context or localStorage in real app)
  const handleGuest = () => {
    localStorage.setItem('guest', 'true');
    navigate('/dashboard');
  };

  return (
    <Box minH="100vh" bg={pageBg}>
      {/* Header */}
      <Flex align="center" px={8} py={4} bg={cardBg} boxShadow="sm">
        <Flex align="center" fontWeight="bold" fontSize="xl">
          <Box w={8} h={8} bg="gray.200" borderRadius="full" mr={2} display="flex" alignItems="center" justifyContent="center">🧠</Box>
          Philosophy Forum
        </Flex>
        <Spacer />
        <Flex align="center" gap={8} fontWeight="medium" color="gray.600">
          <Box as="span" cursor="pointer" color="blue.700" fontWeight="bold">Home</Box>
          <Box as="span" cursor="pointer">Features</Box>
          <Box as="span" cursor="pointer">About</Box>
        </Flex>
        <Button ml={8} colorScheme="blue" onClick={() => navigate('/login')}>Login</Button>
      </Flex>
      {/* Main Section */}
      <Flex maxW="1500px" mx="auto" mt={20} align="center" justify="space-between" px={10} gap={24}>
        {/* Left: Text and Buttons */}
        <Box flex={1} maxW="540px">
          <Heading size="2xl" mb={4} color="blue.900">Philosophy Forum – Think & Discuss</Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            A Collaborative Platform for Philosophical Discussions & Thought Experiments
          </Text>
          <Flex gap={4}>
            <Button colorScheme="orange" size="lg" onClick={() => navigate('/register')}>Join Now</Button>
            <Button variant="outline" size="lg" onClick={handleGuest}>Explore as Guest</Button>
          </Flex>
        </Box>
        {/* Right: Image and Badge */}
        <Box flex={1} display="flex" alignItems="center" justifyContent="center" position="relative" minW="520px">
          <Box w="600px" h="400px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="gray.200">
            <img
              src={TypeShitImg}
              alt="Philosophy Forum Illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          </Box>
          <Box position="absolute" top={6} right={-10} zIndex={2}>
            <Box bg={cardBg} boxShadow="lg" borderRadius="md" px={6} py={3} display="flex" alignItems="center" gap={3}>
              <FaComments color="#3182ce" size={22} />
              <Box>
                <Text fontWeight="bold" fontSize="md">Active Discussions</Text>
                <Text fontSize="sm" color="gray.500">1,234 philosophers online</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home; 