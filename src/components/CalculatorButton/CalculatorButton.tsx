import { type ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

type CalculatorButtonProps = {
  variant: 'primary' | 'secondary' | 'alternate';
  onClick: () => void;
  children: ReactNode;
};

export const CalculatorButton = ({ variant, children, onClick }: CalculatorButtonProps) => {
  return (
    <Button
      color={variant === 'primary' ? 'white' : 'black'}
      bgColor={
        variant === 'primary' ? 'blackAlpha.400' : variant === 'alternate' ? 'cyan.300' : 'cyan.500'
      }
      h='100%'
      w='100%'
      variant='unstyled'
      _hover={{ filter: 'opacity(70%)' }}
      _active={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,.6)) opacity(60%)' }}
      transition='filter .3s'
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
