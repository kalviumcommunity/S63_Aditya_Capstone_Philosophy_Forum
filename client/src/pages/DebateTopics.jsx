import React from 'react';
import { Box, Button, Flex, Heading, IconButton, Text, Badge, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GiSpiralLollipop, GiGreekTemple } from 'react-icons/gi';
import { FaRegHeart, FaYinYang, FaUsers } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const topics = [
  {
    title: 'The Nature of Free Will',
    description: 'Debate the existence and implications of free will in human consciousness',
    debaters: 24,
  },
  {
    title: 'Meaning in an Absurd Universe',
    description: 'Explore whether meaning can exist in a fundamentally meaningless reality',
    debaters: 18,
  },
  {
    title: 'Ethics of Artificial Intelligence',
    description: 'Discuss moral implications of creating conscious artificial beings',
    debaters: 31,
  },
];

const roleIcons = {
  Nihilist: <GiSpiralLollipop size={15} />,
  Existentialist: <FaRegHeart size={15} />,
  Absurdist: <FaYinYang size={15} />,
  Stoic: <GiGreekTemple size={15} />,
};

const DebateTopics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');
  const role = location.state?.role || 'Existentialist';
  const roleIcon = roleIcons[role] || <FaRegHeart size={20} />;

  return (
    <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}>
      <Flex align="center" mb={8}>
        <IconButton
          icon={<ArrowBackIcon />} 
          aria-label="Return"
          variant="ghost"
          mr={4}
          onClick={() => navigate(-1)}
        />
        <Text fontWeight="bold" fontSize="lg" color="gray.600" mr={4}>
          <span style={{ opacity: 0.5, marginRight: 8 }}>{roleIcon}</span> Philosophical Debates
        </Text>
      </Flex>
      <Flex align="center" mb={4}>
        <Heading size="lg" mb={0} mr={2}>
          Select Topic
        </Heading>
        <Badge colorScheme="blue" fontSize="0.95em" px={2} py={1} borderRadius="md" display="inline-flex" alignItems="center" fontWeight="bold">
          <HStack spacing={1}>
            {roleIcon}
            <span style={{fontSize: '1em'}}>{role.toUpperCase()}</span>
          </HStack>
        </Badge>
      </Flex>
      <VStack spacing={6} align="stretch">
        {topics.map((topic, idx) => (
          <Box
            key={idx}
            bg={cardBg}
            borderRadius="lg"
            borderWidth={1}
            borderColor={border}
            p={7}
            boxShadow="sm"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight="bold" fontSize="xl" mb={1}>{topic.title}</Text>
              <Text color="gray.600" fontSize="md" mb={3}>{topic.description}</Text>
              <HStack color="gray.500" fontSize="sm">
                <FaUsers />
                <Text>{topic.debaters} active debaters</Text>
              </HStack>
            </Box>
            <Button colorScheme="orange" mt={{ base: 4, md: 0 }} alignSelf={{ base: 'flex-end', md: 'center' }}>
              Join Debate
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default DebateTopics; 