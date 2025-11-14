describe('对象方法中 this 指向的测试', () => {
  test('1 - 方法作为对象属性调用时，this 指向该对象', () => {
    // 描述：当对象的方法通过对象属性访问方式调用时（obj.method()），
    // this 会正确指向调用该方法的对象
    const testObject = {
      getThisContext() {
        return this;
      },
    };

    // 验证：通过 testObject 调用 getThisContext 时，this 指向 testObject 本身
    expect(testObject.getThisContext()).toBe(testObject);
  });

  test('2 - 方法被提取为独立函数调用时，this 指向变为 undefined（严格模式）', () => {
    // 描述：当对象的方法被提取到独立变量中并直接调用时，
    // 在严格模式下 this 会指向 undefined，因为失去了原有的调用上下文
    const testObject = {
      getThisContext() {
        return this;
      },
    };

    // 将对象方法提取到独立变量中
    const getThisContext = testObject.getThisContext;

    // 验证：独立调用函数时，在严格模式下 this 为 undefined
    // 这体现了 JavaScript 中 this 绑定的动态特性
    expect(getThisContext()).toBeUndefined();
  });
});
