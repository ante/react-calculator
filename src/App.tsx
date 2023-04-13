import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Calculator } from '@/components/Calculator';

function App() {
  return (
    <ChakraProvider>
      <Flex
        h='100vh'
        w='100vw'
        justifyContent='center'
        alignItems='center'
        bgGradient='linear(to-tr, cyan.900, cyan.600, cyan.300)'
      >
        <Calculator />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
