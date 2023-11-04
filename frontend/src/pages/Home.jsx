import { Box, Heading, Text, Highlight, Center, Divider, Container } from '@chakra-ui/react';

export default function Home() {
  return (
    <Center h="600px">
      <Box
        textAlign={'center'}
        display={'flex'}
        h="400px"
        w='50em'
        size="500px"
        bg="#1C4532"
        color="white"
        borderRadius="20%"
        boxShadow="0 5px 10px rgba(0, 0, 0, 0.5)">
        <Container mt="120">
          <Heading mb={4}>Hello! Welcome to Rakamin Book Lab!</Heading>
          <Divider borderWidth={3} borderColor="white" />
          <Text fontSize="xl" mt={4}>
            <Highlight
              query="Gallery"
              styles={{ px: '1', py: '1', rounded: 'full', bg: 'yellow.100' }}>
              *To look for books, please click Gallery*
            </Highlight>
          </Text>
          <Text fontSize="l"> 
            *To add / edit books, please log in *
          </Text>
        </Container>
      </Box>
    </Center>
  );
}
