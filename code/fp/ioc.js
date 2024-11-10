class A {
  constructor(params) {
    this.params = params;
  }
}

class C {
  constructor(params) {
    this.params = params;
  }
}

class Container {
  modules = {};

  provide = (key, object) => {
    this.modules[key] = object;
  };

  get = (key) => {
    return this.modules[key];
  };
}

const mo = new Container();

mo.provide('a', new A('hello'));
mo.provide('c', new C('world'));

class B {
  constructor(container) {
    this.a = container.get('a');
    this.c = container.get('c');
  }
  run() {
    console.log(this.a.params + ' ' + this.c.params);
  }
}

new B(mo).run();
