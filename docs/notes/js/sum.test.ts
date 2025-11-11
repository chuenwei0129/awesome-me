import sum from '@js/sum';

describe('sum function', () => {
  test('adds two positive numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
