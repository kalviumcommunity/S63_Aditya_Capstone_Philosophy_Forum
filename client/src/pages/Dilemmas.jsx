import React, { useState, useEffect } from 'react';
import {
  Box, Button, Flex, Heading, IconButton, Text, VStack, HStack, Badge, useColorModeValue, Spacer, Radio, RadioGroup, Stack, Divider
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = '/api/dilemmas';

const Dilemmas = () => {
  const [selected, setSelected] = useState('');
  const [dilemma, setDilemma] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState({});
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDilemma = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}/current`);
      setDilemma(res.data);
      setLoading(false);
    };
    fetchDilemma();
  }, []);

  if (loading || !dilemma) {
    return <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}><Text>Loading...</Text></Box>;
  }

  // Calculate vote distribution
  const totalVotes = dilemma.options.reduce((sum, opt) => sum + opt.votes, 0);
  const voteDistribution = dilemma.options.map((opt, idx) => ({
    label: opt.label,
    percent: totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0,
    color: ["orange.400", "gray.400", "blue.400"][idx],
  }));

  const handleVote = async () => {
    if (!selected || hasVoted) return;
    const res = await axios.patch(`${API_URL}/vote/${dilemma._id}`, { optionLabel: selected });
    setDilemma(res.data);
    setHasVoted(true);
  };

  const handleLike = async idx => {
    setLikeLoading(like => ({ ...like, [idx]: true }));
    const responseId = dilemma.responses[idx]._id;
    // For demo, use a static userId. In production, use real user/session ID.
    const userId = 'demo-user';
    const res = await axios.patch(`${API_URL}/response/like/${dilemma._id}/${responseId}`, { userId });
    // Update the liked state and upvotes for the response
    setDilemma(d => {
      const newResponses = [...d.responses];
      newResponses[idx] = res.data;
      return { ...d, responses: newResponses };
    });
    setLikeLoading(like => ({ ...like, [idx]: false }));
  };

  return (
    <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}>
      <IconButton
        icon={<ArrowBackIcon />} 
        aria-label="Back to Dilemmas"
        variant="ghost"
        mb={4}
        onClick={() => navigate(-1)}
      />
      <Box bg={cardBg} borderRadius="lg" borderWidth={1} borderColor={border} p={7} mb={8} boxShadow="sm">
        <Flex justify="space-between" align="center" mb={2}>
          <Box>
            <Text color="gray.500" fontSize="sm">{dilemma.subtitle}</Text>
            <Heading size="md" mb={1}>{dilemma.title}</Heading>
          </Box>
          <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="md">{dilemma.timeLeft}</Badge>
        </Flex>
        <Text color="gray.600" fontSize="md" mb={4}>{dilemma.description}</Text>
        <RadioGroup onChange={setSelected} value={selected} mb={4} isDisabled={hasVoted}>
          <VStack align="stretch" spacing={3}>
            {dilemma.options.map((opt, idx) => (
              <Flex key={idx} align="center" bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" p={3} borderWidth={1} borderColor={border}>
                <Radio value={opt.label} colorScheme="orange" mr={3}>{opt.label}</Radio>
                <Spacer />
                <Text color="gray.400" fontSize="sm">{opt.votes} votes</Text>
              </Flex>
            ))}
          </VStack>
        </RadioGroup>
        <Button colorScheme="orange" isDisabled={!selected || hasVoted} alignSelf="flex-end" onClick={handleVote}>
          Submit Vote
        </Button>
      </Box>
      <Flex gap={6} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Box flex={1} bg={cardBg} borderRadius="lg" borderWidth={1} borderColor={border} p={6} boxShadow="sm" minW="260px">
          <Heading size="sm" mb={4}>Vote Distribution</Heading>
          <VStack align="stretch" spacing={2}>
            {voteDistribution.map((vote, idx) => (
              <Flex key={idx} align="center">
                <Box w={2} h={2} borderRadius="full" bg={vote.color} mr={2} />
                <Text fontSize="sm" flex={1}>{vote.label}</Text>
                <Text fontWeight="bold" color={vote.color}>{vote.percent}%</Text>
              </Flex>
            ))}
          </VStack>
        </Box>
        <Box flex={1} bg={cardBg} borderRadius="lg" borderWidth={1} borderColor={border} p={6} boxShadow="sm" minW="260px">
          <Heading size="sm" mb={4}>Top Community Responses</Heading>
          <VStack align="stretch" spacing={4}>
            {dilemma.responses.map((resp, idx) => (
              <Box key={resp._id} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" p={4} borderWidth={1} borderColor={border}>
                <Flex align="center" mb={1}>
                  <Text fontWeight="bold" fontSize="sm" mr={2}>{resp.user}</Text>
                  <Text color="gray.400" fontSize="xs">{resp.time}</Text>
                  <Spacer />
                  <HStack spacing={1} color={resp.likedBy && resp.likedBy.includes('demo-user') ? 'orange.400' : 'gray.500'}>
                    <FaThumbsUp style={{ cursor: 'pointer' }} onClick={() => handleLike(idx)} />
                    <Text>{resp.upvotes}</Text>
                  </HStack>
                </Flex>
                <Text color="gray.600" fontSize="sm">{resp.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dilemmas; 