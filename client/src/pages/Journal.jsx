import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, IconButton, Stack, Text, useColorModeValue, HStack, Input, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { ArrowBackIcon, LockIcon, CalendarIcon, TimeIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER = 'user1'; // Demo user

const Journal = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', isPrivate: false });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/journals/user/user1');
        if (Array.isArray(res.data)) {
          setEntries(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else {
          setEntries([]);
          setError('Unexpected response from server.');
        }
      } catch (err) {
        setEntries([]);
        setError('Failed to load journal entries.');
      }
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const openNewModal = () => {
    setEditEntry(null);
    setForm({ title: '', content: '', isPrivate: false });
    setModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditEntry(entry);
    setForm({ title: entry.title, content: entry.content, isPrivate: entry.isPrivate });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) return;
    if (editEntry) {
      // Update
      const res = await axios.put(`/api/journals/${editEntry._id}`, { ...form });
      setEntries(entries.map(e => e._id === editEntry._id ? res.data : e));
    } else {
      // Create
      const res = await axios.post('/api/journals', { ...form, user: USER });
      setEntries([res.data, ...entries]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/journals/${id}`);
    setEntries(entries.filter(e => e._id !== id));
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
          My Journal
        </Heading>
        <Button colorScheme="gray" variant="outline" onClick={openNewModal}>
          New
        </Button>
      </Flex>
      <Stack spacing={6}>
        {loading ? <Text>Loading...</Text>
          : error ? <Text color="red.500">{error}</Text>
          : entries.length === 0 ? <Text>No journal entries yet.</Text>
          : entries.map((entry) => (
          <Box
            key={entry._id}
            bg={cardBg}
            p={5}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            position="relative"
          >
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {entry.title}
                </Text>
                <HStack spacing={4} color="gray.500" fontSize="sm" mb={2}>
                  <HStack spacing={1}>
                    <CalendarIcon />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </HStack>
                  <HStack spacing={1}>
                    <TimeIcon />
                    <span>{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </HStack>
                </HStack>
                <Text color="gray.600" fontSize="sm">
                  {entry.content}
                </Text>
              </Box>
              <Flex direction="column" align="flex-end" gap={2}>
                {entry.isPrivate && <LockIcon color="gray.400" boxSize={5} mt={1} />}
                <IconButton icon={<EditIcon />} size="sm" variant="ghost" aria-label="Edit" onClick={() => openEditModal(entry)} />
                <IconButton icon={<DeleteIcon />} size="sm" variant="ghost" aria-label="Delete" onClick={() => handleDelete(entry._id)} />
              </Flex>
            </Flex>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editEntry ? 'Edit Entry' : 'New Entry'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={form.title} onChange={handleFormChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Content</FormLabel>
              <Textarea name="content" value={form.content} onChange={handleFormChange} rows={5} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="isPrivate" mb="0">Private</FormLabel>
              <Switch id="isPrivate" name="isPrivate" isChecked={form.isPrivate} onChange={handleFormChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editEntry ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Journal; 