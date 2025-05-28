import React, { useState, useRef } from 'react';
import {
  Box, Flex, Text, Heading, Avatar, Button, Input, Textarea, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, IconButton
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const initialProfile = {
  name: 'Aditya Rane',
  role: 'Philosophy Enthusiast',
  bio: 'Exploring the intersections of ethics, metaphysics, and epistemology. Always eager to engage in meaningful philosophical discourse.',
  posts: 142,
  discussions: 89,
  upvotes: 1247,
  location: 'Mumbai, India',
  joined: 'March 2023',
  avatar: '',
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef();
  const cardBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const navigate = useNavigate();

  const handleNameChange = (e) => setProfile({ ...profile, name: e.target.value });
  const handleBioChange = (e) => setProfile({ ...profile, bio: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfile((p) => ({ ...p, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}>
      <IconButton
        icon={<ArrowBackIcon />} 
        aria-label="Return"
        variant="ghost"
        mb={4}
        onClick={() => navigate(-1)}
      />
      <Flex maxW="1200px" mx="auto" align="flex-start" gap={10}>
        {/* Left: Profile Card */}
        <Box w="320px" bg={cardBg} borderRadius="lg" boxShadow="md" p={8} textAlign="center">
          <Box position="relative" mb={4}>
            <Avatar size="2xl" name={profile.name} src={avatarPreview} mx="auto" />
            {editMode && (
              <Button
                size="xs"
                position="absolute"
                bottom={2}
                left="50%"
                transform="translateX(-50%)"
                colorScheme="blue"
                onClick={() => fileInputRef.current.click()}
                mt={2}
              >
                Upload
              </Button>
            )}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              display="none"
              onChange={handleAvatarChange}
            />
          </Box>
          <Flex align="center" justify="center" mb={1}>
            {editingName ? (
              <Input
                value={profile.name}
                onChange={handleNameChange}
                size="sm"
                maxW="140px"
                mr={2}
                onBlur={() => setEditingName(false)}
                autoFocus
              />
            ) : (
              <Heading size="md" mr={2}>{profile.name}</Heading>
            )}
            {editMode && (
              <IconButton
                icon={editingName ? <CheckIcon /> : <EditIcon />}
                size="xs"
                variant="ghost"
                aria-label="Edit Name"
                onClick={() => setEditingName((e) => !e)}
                ml={1}
              />
            )}
          </Flex>
          <Text color="gray.500" mb={3}>{profile.role}</Text>
          <Button size="sm" colorScheme="yellow" variant={editMode ? 'solid' : 'outline'} mb={4} onClick={() => setEditMode((m) => !m)}>
            {editMode ? 'Done' : 'Edit Profile'}
          </Button>
          <Flex justify="space-between" mb={2}>
            <Box>
              <Text fontWeight="bold">{profile.posts}</Text>
              <Text fontSize="xs" color="gray.500">Posts</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">{profile.discussions}</Text>
              <Text fontSize="xs" color="gray.500">Discussions</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">{profile.upvotes}</Text>
              <Text fontSize="xs" color="gray.500">Upvotes</Text>
            </Box>
          </Flex>
          <Text fontSize="sm" color="gray.600" mb={1}>Location: {profile.location}</Text>
          <Text fontSize="sm" color="gray.600">Joined: {profile.joined}</Text>
        </Box>
        {/* Right: About and Tabs, stacked vertically */}
        <Box flex={1}>
          <Box bg={cardBg} borderRadius="md" boxShadow="sm" p={6} mb={6}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>About</Text>
            <Flex align="center">
              {editingBio ? (
                <Textarea
                  value={profile.bio}
                  onChange={handleBioChange}
                  size="sm"
                  rows={2}
                  mr={2}
                  onBlur={() => setEditingBio(false)}
                  autoFocus
                />
              ) : (
                <Text fontSize="md" color="gray.700" flex={1}>{profile.bio}</Text>
              )}
              {editMode && (
                <IconButton
                  icon={editingBio ? <CheckIcon /> : <EditIcon />}
                  size="sm"
                  variant="ghost"
                  aria-label="Edit Bio"
                  onClick={() => setEditingBio((e) => !e)}
                  ml={2}
                />
              )}
            </Flex>
          </Box>
          <Box bg={cardBg} borderRadius="md" boxShadow="sm" p={6}>
            <Tabs variant="unstyled" colorScheme="blue">
              <TabList mb={2} borderBottom="1px solid #eee">
                <Tab _selected={{ borderBottom: '2px solid #3182ce', color: 'blue.600' }}>Posts</Tab>
                <Tab _selected={{ borderBottom: '2px solid #3182ce', color: 'blue.600' }}>Discussions</Tab>
                <Tab _selected={{ borderBottom: '2px solid #3182ce', color: 'blue.600' }}>Recent Activity</Tab>
              </TabList>
              <TabPanels>
                <TabPanel><Text color="gray.400">No posts yet.</Text></TabPanel>
                <TabPanel><Text color="gray.400">No discussions yet.</Text></TabPanel>
                <TabPanel><Text color="gray.400">No recent activity.</Text></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile; 