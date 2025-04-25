import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="bg-gray-900 p-4 mb-4 rounded-md text-right">
        <div className="text-3xl font-bold text-white overflow-hidden">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button 
          onClick={clearAll} 
          variant="destructive" 
          className="col-span-1"
        >
          AC
        </Button>
        <Button 
          onClick={toggleSign} 
          variant="secondary" 
          className="col-span-1"
        >
          +/-
        </Button>
        <Button 
          onClick={inputPercent} 
          variant="secondary" 
          className="col-span-1"
        >
          %
        </Button>
        <Button 
          onClick={() => performOperation('÷')} 
          variant="secondary" 
          className={cn("col-span-1", operation === '÷' ? "bg-orange-500 text-white" : "")}
        >
          ÷
        </Button>

        {[7, 8, 9].map((num) => (
          <Button 
            key={num} 
            onClick={() => inputDigit(num.toString())} 
            variant="outline" 
            className="col-span-1 bg-gray-700 text-white hover:bg-gray-600"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('×')} 
          variant="secondary" 
          className={cn("col-span-1", operation === '×' ? "bg-orange-500 text-white" : "")}
        >
          ×
        </Button>

        {[4, 5, 6].map((num) => (
          <Button 
            key={num} 
            onClick={() => inputDigit(num.toString())} 
            variant="outline" 
            className="col-span-1 bg-gray-700 text-white hover:bg-gray-600"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('-')} 
          variant="secondary" 
          className={cn("col-span-1", operation === '-' ? "bg-orange-500 text-white" : "")}
        >
          -
        </Button>

        {[1, 2, 3].map((num) => (
          <Button 
            key={num} 
            onClick={() => inputDigit(num.toString())} 
            variant="outline" 
            className="col-span-1 bg-gray-700 text-white hover:bg-gray-600"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('+')} 
          variant="secondary" 
          className={cn("col-span-1", operation === '+' ? "bg-orange-500 text-white" : "")}
        >
          +
        </Button>

        <Button 
          onClick={() => inputDigit('0')} 
          variant="outline" 
          className="col-span-2 bg-gray-700 text-white hover:bg-gray-600"
        >
          0
        </Button>
        <Button 
          onClick={inputDecimal} 
          variant="outline" 
          className="col-span-1 bg-gray-700 text-white hover:bg-gray-600"
        >
          .
        </Button>
        <Button 
          onClick={() => performOperation('=')} 
          className="col-span-1 bg-orange-500 text-white hover:bg-orange-600"
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;