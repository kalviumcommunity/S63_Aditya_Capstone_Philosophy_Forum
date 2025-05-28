import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Text, Heading, VStack, HStack, IconButton, Avatar, Badge, Spinner, useColorModeValue, Button
} from '@chakra-ui/react';
import { FaRegComment, FaRegThumbsUp, FaShare, FaBookmark, FaTrash } from 'react-icons/fa';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_ID = 'user1'; // Replace with actual user logic

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unbookmarking, setUnbookmarking] = useState({});
  const [upvoting, setUpvoting] = useState({});
  const cardBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchBookmarks = async () => {
      setLoading(true);
      // Example: const res = await axios.get(`/api/bookmarks/${USER_ID}`);
      // setBookmarks(res.data);
      setTimeout(() => {
        setBookmarks([
          {
            _id: '1',
            title: 'The Nature of Consciousness',
            author: 'Marcus Chen',
            authorRole: 'Professor of Philosophy',
            time: '2 hours ago',
            excerpt: 'Exploring the hard problem of consciousness and its implications for artificial intelligence and the future of human experience...',
            comments: 39,
            upvotes: 234,
            bookmarked: true,
          },
          {
            _id: '2',
            title: 'Weekly Reflection: Ethics of Technology',
            author: 'Elena Smith',
            authorRole: 'Research Fellow',
            time: '5 hours ago',
            excerpt: 'As we continue to develop more advanced AI systems, we must consider the ethical implications of creating machines that can think and reason...',
            comments: 45,
            upvotes: 156,
            bookmarked: true,
          },
        ]);
        setLoading(false);
      }, 800);
    };
    fetchBookmarks();
  }, []);

  // Unbookmark handler
  const handleUnbookmark = async (id) => {
    setUnbookmarking((prev) => ({ ...prev, [id]: true }));
    // TODO: Replace with actual API call
    // await axios.delete(`/api/bookmarks/${id}`);
    setTimeout(() => {
      setBookmarks((prev) => prev.filter((item) => item._id !== id));
      setUnbookmarking((prev) => ({ ...prev, [id]: false }));
    }, 500);
  };

  // Upvote handler
  const handleUpvote = async (id) => {
    setUpvoting((prev) => ({ ...prev, [id]: true }));
    // TODO: Replace with actual API call
    // await axios.patch(`/api/posts/${id}/upvote`, { userId: USER_ID });
    setTimeout(() => {
      setBookmarks((prev) => prev.map((item) => item._id === id ? { ...item, upvotes: item.upvotes + 1 } : item));
      setUpvoting((prev) => ({ ...prev, [id]: false }));
    }, 400);
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
        <Heading size="lg" flex={1} textAlign="left">Bookmarked Posts</Heading>
      </Flex>
      {loading ? (
        <Flex justify="center" align="center" minH="200px"><Spinner size="xl" /></Flex>
      ) : bookmarks.length === 0 ? (
        <Text textAlign="center" color="gray.500">No bookmarks yet.</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {bookmarks.map((item) => (
            <Box key={item._id} bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={2}>
                <Avatar size="sm" name={item.author} mr={3} />
                <Box>
                  <Text fontWeight="bold">{item.author}</Text>
                  <Text fontSize="sm" color="gray.500">{item.authorRole} • {item.time}</Text>
                </Box>
                <Badge colorScheme="yellow" ml="auto" px={2} py={1} borderRadius="md">
                  <FaBookmark style={{ marginRight: 4 }} /> Bookmarked
                </Badge>
                <IconButton
                  icon={<FaTrash />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  ml={3}
                  aria-label="Unbookmark"
                  isLoading={unbookmarking[item._id]}
                  onClick={() => handleUnbookmark(item._id)}
                />
              </Flex>
              <Heading size="md" mb={2}>{item.title}</Heading>
              <Text color="gray.700" mb={4}>{item.excerpt}</Text>
              <HStack spacing={8} color="gray.500">
                <HStack><FaRegComment /> <Text>{item.comments} Comments</Text></HStack>
                <HStack>
                  <IconButton
                    icon={<FaRegThumbsUp />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    aria-label="Upvote"
                    isLoading={upvoting[item._id]}
                    onClick={() => handleUpvote(item._id)}
                  />
                  <Text>{item.upvotes} Upvotes</Text>
                </HStack>
                <HStack><FaShare /> <Text>Share</Text></HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Bookmarks; 