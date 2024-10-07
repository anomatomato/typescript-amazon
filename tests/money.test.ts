import { describe, expect, it } from 'vitest';
import formatCurrency from '../src/scripts/utils/money';

type TestCase = {
  input: number;
  expected: string;
  description: string;
};

const testCases: TestCase[] = [
  { input: 2095, expected: '20.95', description: 'simple formatting of 2095 cents' },
  { input: 0, expected: '0.00', description: 'formats zero cents to 0.00' },
  { input: 2000.5, expected: '20.01', description: 'rounds 2000.5 cents up to nearest cent' },
  { input: 2000.4, expected: '20.00', description: 'rounds 2000.4 cents down to nearest cent' },
  { input: 123456789, expected: '1234567.89', description: 'formats large values correctly' },
];

describe('formatCurrency function', () => {
  testCases.forEach(({ input, expected, description }) => {
    it(`Format Currency: ${description}`, () => {
      expect(formatCurrency(input)).toBe(expected);
    });
  });
});