describe('x', () => {
  it('1', () => {
    const testObj = {
      foo() {
        return this;
      },
    };

    expect(testObj.foo()).toBe(testObj);
  });

  it('2', () => {
    const testObj = {
      foo() {
        return this;
      },
    };

    const foo = testObj.foo;

    expect(foo()).toBe(undefined);
  });
});
