import React from 'react';
import {
  Box, Flex, Text, Heading, VStack, HStack, Button, Divider, Avatar, Icon, Spacer, Link as ChakraLink, Badge,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaHome, FaBook, FaComments, FaQuestion, FaBalanceScaleLeft, FaClipboardList, FaBookmark, FaUser, FaPlus, FaLightbulb } from 'react-icons/fa';

const sidebarLinks = [
  { icon: FaHome, label: 'Home', path: '/dashboard' },
  { icon: FaComments, label: 'Discussions', path: '/discussions' },
  { icon: FaBook, label: 'Journal', path: '/journal' },
  { icon: FaBalanceScaleLeft, label: 'Debates', path: '/debates' },
  { icon: FaQuestion, label: 'Questions', path: '/questions' },
  { icon: FaClipboardList, label: 'Dilemmas', path: '/dilemmas' },
  { icon: FaLightbulb, label: 'Quiz', path: '/quiz' },
  { icon: FaBookmark, label: 'Bookmarks', path: '/bookmarks' },
  { icon: FaUser, label: 'Profile', path: '/profile' },
  { icon: FaPlus, label: 'Recommendation', path: '/recommendation' },
];

const activity = [
  {
    user: 'Marcus Cherer',
    action: 'replied to your comment in',
    context: 'Existentialism in Modern Context',
    time: '2 hours ago',
    type: 'reply',
  },
  {
    user: 'Elena Smit',
    action: 'mentioned you in',
    context: 'Free Will Debate',
    time: '5 hours ago',
    type: 'mention',
  },
  {
    user: 'Your post',
    action: 'Ethics of AI Development received 25 new upvotes',
    context: '',
    time: '12 hours ago',
    type: 'upvote',
  },
];

function SidebarContent() {
  return (
    <Flex direction="column" h="100%" justify="space-between">
      {/* Top: Logo */}
      <Box>
        <Flex align="center" mb={10}>
          <Avatar size="sm" mr={2} />
          <Text fontWeight="bold" fontSize="lg">Philosophy Forum</Text>
        </Flex>
        {/* Middle: Nav links, spaced evenly */}
        <VStack align="stretch" spacing={0} flexGrow={1}>
          {sidebarLinks.map(link => (
            <Button
              as={Link}
              to={link.path}
              key={link.label}
              leftIcon={<Icon as={link.icon} />}
              variant="ghost"
              justifyContent="flex-start"
              fontWeight="normal"
              colorScheme="gray"
              py={6} // Make each button taller for more even spacing
            >
              {link.label}
            </Button>
          ))}
        </VStack>
      </Box>
      {/* Bottom: User profile */}
      <Flex align="center" mt={10} mb={2}>
        <Avatar size="sm" mr={2} />
        <Box>
          <Text fontWeight="bold" fontSize="sm">Aditya Rane</Text>
          <Text fontSize="xs" color="gray.500">Philosopher</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="#fcf7ef">
      {/* Hamburger for mobile */}
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        position="fixed"
        top={4}
        left={4}
        zIndex={1000}
      />
      {/* Sidebar for desktop */}
      <Box
        w="250px"
        bg="white"
        boxShadow="md"
        p={6}
        display={{ base: 'none', md: 'block' }}
        h="100vh"
      >
        <SidebarContent />
      </Box>
      {/* Drawer for mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Philosophy Forum</DrawerHeader>
          <DrawerBody h="100vh" p={0}>
            <Box p={6} h="100%">
              <SidebarContent />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Main Content */}
      <Box flex={1} p={10}>
        <Heading size="lg" mb={1} color="blue.900">Welcome back, Aditya</Heading>
        <Text color="gray.500" mb={8}>Continue your philosophical journey</Text>
        <HStack spacing={6} mb={8} align="stretch">
          {/* Daily Deep Question Card */}
          <Box bg="white" p={6} rounded="xl" boxShadow="md" flex={1}>
            <Text fontWeight="bold" mb={2}>Daily Deep Question <Badge colorScheme="gray" ml={2}>24h remaining</Badge></Text>
            <Text fontSize="sm" mb={4}>
              "If you could know the absolute truth about one philosophical question, which would you choose and why?"
            </Text>
            <Button colorScheme="yellow" size="sm" mb={2}>Share Thoughts</Button>
            <Text fontSize="xs" color="gray.500">142 responses</Text>
          </Box>
          {/* Moral Dilemma Card */}
          <Box bg="white" p={6} rounded="xl" boxShadow="md" flex={1}>
            <Text fontWeight="bold" mb={2}>Moral Dilemma of the Week <Badge colorScheme="gray" ml={2}>4d remaining</Badge></Text>
            <Text fontSize="sm" mb={4}>
              "The Trolley Problem: Modern Variations in the Age of Autonomous Vehicles"
            </Text>
            <Button colorScheme="orange" size="sm" mb={2}>Join Debate</Button>
            <Text fontSize="xs" color="gray.500">89 participants</Text>
          </Box>
        </HStack>
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Recent Activity</Text>
          <VStack align="stretch" spacing={3}>
            {activity.map((item, idx) => (
              <Box key={idx} bg="white" p={4} rounded="lg" boxShadow="sm">
                <HStack>
                  <Avatar size="xs" />
                  <Text fontWeight="bold" fontSize="sm">{item.user}</Text>
                  <Text fontSize="sm">{item.action}</Text>
                  {item.context && <ChakraLink color="orange.500" fontWeight="medium">{item.context}</ChakraLink>}
                  <Spacer />
                  <Text fontSize="xs" color="gray.400">{item.time}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard; 