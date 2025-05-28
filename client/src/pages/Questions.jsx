import React, { useState } from 'react';
import {
  Box, Button, Flex, Heading, IconButton, Text, Textarea, VStack, HStack, Avatar, Badge, Spacer, useColorModeValue, Divider
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const responses = [
  {
    user: 'Sarah Chen',
    time: '10:45',
    text: 'The concept of consciousness itself might be an emergent property, arising from the complex interactions of simpler processes. This challenges our traditional notion of a singular, unified self.',
    upvotes: 45,
    replies: [
      {
        user: 'Marcus Kim',
        time: '11:15',
        text: 'Interesting perspective. The emergent property theory also aligns with recent findings in neuroscience about distributed consciousness.',
        upvotes: 23,
      },
    ],
  },
  {
    user: 'Elena Park',
    time: '11:30',
    text: 'Perhaps consciousness is not binary but exists on a spectrum. This would explain varying levels of awareness across different species and AI systems.',
    upvotes: 38,
    replies: [],
  },
];

const Questions = () => {
  const [response, setResponse] = useState('');
  const [allResponses, setAllResponses] = useState(responses);
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!response) return;
    const now = dayjs().format('HH:mm');
    setAllResponses([
      {
        user: 'You',
        time: now,
        text: response,
        upvotes: 0,
        replies: [],
      },
      ...allResponses,
    ]);
    setResponse('');
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
        <Text fontWeight="bold" fontSize="lg" color="gray.600" mr={4}>
          <Badge colorScheme="gray" mr={2}>Daily Deep Question</Badge>
        </Text>
        <Spacer />
        <Button variant="outline" colorScheme="gray" size="sm">Previous Questions</Button>
      </Flex>
      <Box bg={cardBg} borderRadius="lg" borderWidth={1} borderColor={border} p={7} mb={8} boxShadow="sm">
        <Flex justify="space-between" align="center" mb={2}>
          <Text color="gray.500" fontSize="sm">Today's Question</Text>
          <Text color="gray.400" fontSize="xs">23:45:12 remaining</Text>
        </Flex>
        <Heading size="md" mb={2}>
          What is the nature of consciousness, and can it be replicated artificially?
        </Heading>
        <Text color="gray.600" fontSize="md" mb={4}>
          Consider the philosophical implications of consciousness, its relationship to the physical brain, and whether artificial systems could ever truly be conscious. What defines consciousness, and how would we recognize it in an artificial system?
        </Text>
        <Textarea
          placeholder="Share your thoughts..."
          value={response}
          onChange={e => setResponse(e.target.value)}
          mb={4}
          bg={useColorModeValue('white', 'gray.700')}
        />
        <Button colorScheme="orange" isDisabled={!response} alignSelf="flex-end" onClick={handleSubmit}>
          Submit Response
        </Button>
      </Box>
      <VStack spacing={6} align="stretch">
        {allResponses.map((resp, idx) => (
          <Box
            key={idx}
            bg={cardBg}
            borderRadius="lg"
            borderWidth={1}
            borderColor={border}
            p={6}
            boxShadow="sm"
          >
            <Flex align="center" mb={1}>
              <Avatar size="sm" name={resp.user} mr={2} />
              <Text fontWeight="bold" fontSize="md" mr={2}>{resp.user}</Text>
              <Text color="gray.400" fontSize="sm">{resp.time}</Text>
              <Spacer />
              <HStack spacing={1} color="gray.500">
                <FaChevronUp />
                <Text>{resp.upvotes}</Text>
              </HStack>
            </Flex>
            <Text color="gray.700" fontSize="md" mb={2}>{resp.text}</Text>
            {resp.replies.length > 0 && (
              <Box pl={8} borderLeft="2px solid #ececec" mt={2}>
                {resp.replies.map((reply, ridx) => (
                  <Box key={ridx} mb={2}>
                    <Flex align="center" mb={1}>
                      <Avatar size="xs" name={reply.user} mr={2} />
                      <Text fontWeight="bold" fontSize="sm" mr={2}>{reply.user}</Text>
                      <Text color="gray.400" fontSize="xs">{reply.time}</Text>
                      <Spacer />
                      <HStack spacing={1} color="gray.500">
                        <FaChevronUp />
                        <Text fontSize="sm">{reply.upvotes}</Text>
                      </HStack>
                    </Flex>
                    <Text color="gray.600" fontSize="sm">{reply.text}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Questions; 