import React from 'react';
import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GiSpiralLollipop, GiGreekTemple } from 'react-icons/gi';
import { FaRegHeart, FaYinYang } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    icon: <GiSpiralLollipop size={28} />, // Nihilist
    title: 'Nihilist',
    description: 'Argue from the perspective that life has no inherent meaning or universal truth',
  },
  {
    icon: <FaRegHeart size={28} />, // Existentialist
    title: 'Existentialist',
    description: 'Focus on individual existence, freedom, and responsibility in a meaningless universe',
  },
  {
    icon: <FaYinYang size={28} />, // Absurdist
    title: 'Absurdist',
    description: 'Explore the conflict between seeking meaning and the inability to find it',
  },
  {
    icon: <GiGreekTemple size={28} />, // Stoic
    title: 'Stoic',
    description: 'Advocate for virtue, reason, and living in harmony with nature',
  },
];

const Debates = () => {
  const cardBg = useColorModeValue('white', 'gray.50');
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const border = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    navigate('/debate-topics', { state: { role: role.title } });
  };

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
        <Heading size="lg" flex={1}>
          Choose Your Philosophical Role
        </Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {roles.map((role, idx) => (
          <Box
            key={idx}
            as="button"
            onClick={() => handleRoleClick(role)}
            bg={cardBg}
            borderRadius="lg"
            borderWidth={1}
            borderColor={border}
            p={7}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            boxShadow="sm"
            _hover={{ boxShadow: 'md', borderColor: 'blue.400', cursor: 'pointer' }}
            transition="all 0.2s"
          >
            <Box mb={2} color="gray.600">
              {role.icon}
            </Box>
            <Text fontWeight="bold" fontSize="lg" mb={1}>{role.title}</Text>
            <Text color="gray.600" fontSize="sm">{role.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Debates; 