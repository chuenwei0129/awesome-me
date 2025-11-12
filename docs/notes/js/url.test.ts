/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('use jsdom and set the URL in this test file', () => {
  expect(window.location.href).toBe('https://jestjs.io/');
});
