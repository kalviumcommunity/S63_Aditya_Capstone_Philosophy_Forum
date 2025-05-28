  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import {
    Box,
    Button,
    Checkbox,
    Divider,
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
    Link
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { FcGoogle } from 'react-icons/fc';
  import { FaFacebook } from 'react-icons/fa';
  import axios from 'axios';

  const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      setLoading(true);
      try {
        const res = await axios.post('/api/users/login', { email, password });
        if (res.status === 200 && res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1000); // Delay for user feedback
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed.');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
        <Stack spacing={8} mx={'auto'} w={'full'} maxW={'md'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'}>Welcome back</Heading>
            <Text fontSize={'sm'} color={'gray.600'}>
              Please enter your details
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
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
                <Stack spacing={5}>
                  <Flex justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'} fontSize="sm">Forgot password?</Link>
                  </Flex>
                  {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                  {success && <Text color="green.500" fontSize="sm">{success}</Text>}
                  <Button type="submit" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }} isLoading={loading} disabled={loading}>
                    Sign in
                  </Button>
                  <Flex align="center">
                    <Divider />
                    <Text px={2} fontSize="sm" color="gray.500">or</Text>
                    <Divider />
                  </Flex>
                  <Button variant="outline" leftIcon={<FcGoogle />}>
                    Sign in with Google
                  </Button>
                  <Button variant="outline" leftIcon={<FaFacebook color="#3b5998" />}>
                    Sign in with Facebook
                  </Button>
                  <Text align={'center'} fontSize="sm">
                    Don't have an account? <Link color={'blue.400'} href="/register">Sign up</Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  };

  export default LoginPage;


  