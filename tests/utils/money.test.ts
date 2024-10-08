import { describe, expect, it } from 'vitest';
import formatCurrency from '../../src/scripts/utils/money';

type TestCase = {
  input: number;
  expected: string;
  description: string;
};

const testCases: TestCase[] = [
  { input: 2095, expected: '20.95', description: 'converts cents into dollars' },
  { input: 0, expected: '0.00', description: 'works with 0' },
  { input: 2000.5, expected: '20.01', description: 'rounds up to the nearest cent' },
  { input: 2000.4, expected: '20.00', description: 'rounds down to the nearest cent' },
  { input: 123456789, expected: '1234567.89', description: 'formats large values correctly' },
];

describe('test suite: formatCurrency', () => {
  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      expect(formatCurrency(input)).toEqual(expected);
    });
  });
});