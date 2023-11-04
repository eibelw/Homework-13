import { Card, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card key={id} mr='3' my={4} p='5'cursor="pointer" borderRadius={20} boxShadow={"0 3px 5px rgba(0,0,0,0.5)"}>
        <VStack>
          <Heading size={'md'}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image w={24} h={24} src={`http://localhost:8000/${image}`} />
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
