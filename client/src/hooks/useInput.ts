import { useState } from 'react';

export function useRemoveDuplicateArray<T>(initialValue: T[]) {
  const [value, setValue] = useState<T[]>(initialValue);

  const uniqueValue = initialValue.filter(
    (value, index) => index === initialValue.findIndex((item) => item === value)
  );

  const resetArray = () => setValue(value);

  return [uniqueValue, resetArray];
}
