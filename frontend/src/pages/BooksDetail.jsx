import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box p='10' borderRadius='10' boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" bg='#FFFBF5'>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex my="6">
          <Box w="300px">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Descriptions: {book.desc}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Author: {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Publisher: {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              Made in: {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem('token') && (
        <HStack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}