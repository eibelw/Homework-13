import {
  Button,
  Breadcrumb,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../modules/fetch';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem('token')]);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#495E57"
      color="white"
      boxShadow="0 3px 5px rgba(0, 0, 0, 0.5)">
      <Breadcrumb>
        <Link to="/">
          <Flex align="center" mr={5} cursor="pointer">
            <Text fontSize="xl" fontWeight="bold">
              Home
            </Text>
          </Flex>
        </Link>
        <Link to="/gallery">
          <Flex align="left" cursor="pointer">
            <Text fontSize="xl" fontWeight="bold">
              Gallery
            </Text>
          </Flex>
        </Link>
      </Breadcrumb>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="green">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="yellow">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="yellow"
            onClick={() => {
              window.localStorage.removeItem('token');
              setIsLogin(false);
              navigate('/');
              toast({
                title: "You've logged out!",
                description: 'Goodbye!',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }}>
            Logout
          </Button>
        )}
        <Link to="/register">
          <Button colorScheme="yellow">Sign Up</Button>
        </Link>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(e.target.email.value, e.target.password.value);
              window.localStorage.setItem('token', token.token);
              navigate('/');
              onClose();
              toast({
                title: "You've logged in!",
                description: 'Welcome back!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            } catch (err) {
              toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Enter your email address" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" placeholder="Enter your password" />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="yellow" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">Doesn't Have Account? Click here</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
