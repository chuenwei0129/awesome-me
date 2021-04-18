// es5 和 es6 继承区别

// 静态属性和方法是可被继承的

// super 关键字，对象字面量中，代表原型对象
// class 中 super(...) 代表父 class 的 constructor

class Animal {
	constructor() {
		console.log('我先执行', this)
	}
	fn() {
		console.log('h')
	}
}

class Rabbit extends Animal {
	// 不写相当于
	constructor(...args) {
		super(...args) // 执行 Animal 的 constructor，super
		// ES6 中子类没有自己的this，必须执行super()，子类的this是从父类继承的
		// 执行super() ===  Animal 的 constructor() ,此时便有了 this，这两个 this 是一样的
		console.log('我后执行', this)
	}
	// 父类构造器总是会使用它自己字段的值
}

new Animal()

console.log(Object.keys(new Animal()))

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

function Father() {
	// es5 把 父 this 显示改成 子 this
	this.name = '100'
	console.log(this)
}

Father.c = () => console.log('c')

Father.prototype.fn = function() {
	console.log('fn')
}

const f = new Father()

Object.setPrototypeOf(Son.prototype, Father.prototype)
Object.setPrototypeOf(Son, Father)

function Son() {
	// 相当于 Father 在这执行
	Father.call(this)
	// this 是 Son 自己的，
}
console.log(Son.c())

const son = new Son()

console.log('fn' in son)