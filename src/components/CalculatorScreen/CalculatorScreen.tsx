import { HStack, VStack, Text } from '@chakra-ui/react';

type CalculatorScreenProps = {
  total: string;
  current: string;
  operator: string;
};

export const CalculatorScreen = ({ total, current, operator }: CalculatorScreenProps) => {
  return (
    <VStack color='white' alignItems='flex-end' h='100%' w='100%'>
      <Text fontSize='4xl'>{total}</Text>
      <HStack alignItems='center' justifyContent='space-between' w='100%'>
        <Text fontSize='4xl'>{operator}</Text>
        <Text fontSize='3xl'>{current}</Text>
      </HStack>
    </VStack>
  );
};
