import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link,
  Divider
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      return 'Please fill in all fields.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return 'Invalid email address.';
    }
    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!form.terms) {
      return 'You must agree to the Terms of Service and Privacy Policy.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const name = `${form.firstName} ${form.lastName}`;
      const res = await axios.post('/api/users/create', {
        name,
        email: form.email,
        password: form.password,
      });
      if (res.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} w={'full'} maxW={'md'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Create an account</Heading>
          <Text fontSize={'sm'} color={'gray.600'}>
            Fill in your details to get started
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Flex gap={4}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                </FormControl>
              </Flex>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={form.email} onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} />
                  <InputRightElement h={'full'}>
                    <IconButton
                      variant="ghost"
                      aria-label="Toggle Password Visibility"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
              </FormControl>
              <Stack spacing={5}>
                <Checkbox name="terms" isChecked={form.terms} onChange={handleChange}>
                  I agree to the <Link color={'blue.400'}>Terms of Service</Link> and <Link color={'blue.400'}>Privacy Policy</Link>
                </Checkbox>
                {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                {success && <Text color="green.500" fontSize="sm">{success}</Text>}
                <Button type="submit" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }} isLoading={loading}>
                  Create account
                </Button>
                <Flex align="center">
                  <Divider />
                  <Text px={2} fontSize="sm" color="gray.500">or</Text>
                  <Divider />
                </Flex>
                <Button variant="outline" leftIcon={<FcGoogle />}>
                  Sign up with Google
                </Button>
                <Text align={'center'} fontSize="sm">
                  Already have an account? <Link color={'blue.400'} href="/login">Sign in</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupPage;


