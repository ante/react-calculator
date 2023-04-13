import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Decimal from 'decimal.js-light';

import { CalculatorScreen } from '@/components/CalculatorScreen';
import { CalculatorButton } from '@/components/CalculatorButton';

// 4 buttons per row
const BUTTONS = [
  'C',
  '/',
  '*',
  'Back',
  '7',
  '8',
  '9',
  '-',
  '4',
  '5',
  '6',
  '+',
  '1',
  '2',
  '3',
  '=',
  '+/-',
  '0',
  '.',
];

const MAX_LENGTH = 15;

const getVariant = (index: number) => {
  // top row of buttons
  if (index >= 0 && index < 4) return 'alternate';
  // final column of buttons
  if (index % 4 === 3) return 'secondary';
  // numbers/decimal/sign
  return 'primary';
};

const evaluate = (a: string, b: string, op: string): string => {
  const decA = new Decimal(a);
  const decB = new Decimal(b);
  let result = new Decimal(0);

  switch (op) {
    case '*':
      result = decA.mul(decB);
      break;
    case '/':
      if (b === '0') return 'Error';
      else result = decA.div(decB);
      break;
    case '+':
      result = decA.add(decB);
      break;
    case '-':
      result = decA.minus(decB);
      break;
  }

  // if results are going to overflow the calculator, return something that fits
  if (result.toString().length > MAX_LENGTH) return result.toExponential(5);
  return result.toString();
};

export const Calculator = () => {
  const [total, setTotal] = useState('');
  const [operator, setOperator] = useState('');
  const [current, setCurrent] = useState('');

  const handleClear = () => {
    setTotal('');
    setOperator('');
    setCurrent('');
  };

  const handleOperator = (button: string) => {
    if (current || total) {
      if (operator && total) {
        setTotal(evaluate(total, current, operator));
      } else if (!total) {
        setTotal(current);
      }

      setOperator(button);
      setCurrent('');
    }
  };

  const handleEqual = () => {
    if (total && current && operator) setTotal(evaluate(total, current, operator));
    setOperator('');
    setCurrent('');
  };

  const handleBack = () => {
    if (current) setCurrent((prevCurrent) => prevCurrent.slice(0, -1));
  };

  const handleSign = () => {
    if (current.startsWith('-')) setCurrent((prevCurrent) => prevCurrent.slice(1));
    else setCurrent((prevCurrent) => '-' + prevCurrent);
  };

  const handleInput = (button: string) => {
    if (current.length >= MAX_LENGTH) return;
    setCurrent((prevCurrent) => prevCurrent + button);
  };

  const handleClick = (button: string) => {
    switch (button) {
      case 'C':
        handleClear();
        break;
      case 'Back':
        handleBack();
        break;
      case '=':
        handleEqual();
        break;
      case '+/-':
        handleSign();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperator(button);
        break;
      default:
        handleInput(button);
    }
  };

  return (
    <Grid
      templateColumns='repeat(4, 1fr)'
      templateRows=' 25% repeat(5, 1fr)'
      gap={3}
      h='520px'
      w='350px'
      bgColor='blackAlpha.500'
      padding={3}
      borderRadius='md'
      overflow='hidden'
    >
      <GridItem colSpan={4}>
        <CalculatorScreen total={total} current={current} operator={operator} />
      </GridItem>
      {BUTTONS.map((button, i) => (
        <GridItem w='100%' h='100%' rowSpan={button === '=' ? 2 : 1} key={button}>
          <CalculatorButton variant={getVariant(i)} onClick={() => handleClick(button)}>
            {button}
          </CalculatorButton>
        </GridItem>
      ))}
    </Grid>
  );
};
