const sum = require('./sum');

describe('sum function', () => {
  test('adds two positive numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(5, 7)).toBe(12);
  });

  test('adds negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
    expect(sum(-5, 3)).toBe(-2);
  });

  test('adds zero correctly', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(5, 0)).toBe(5);
    expect(sum(0, 5)).toBe(5);
  });

  test('works with decimal numbers', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(2.5, 3.7)).toBeCloseTo(6.2);
  });
});