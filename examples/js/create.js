const origin = { a: 1 }

const o = Object.create(origin)

console.log(
	Object.getPrototypeOf(o) === origin,
	o.__proto__ === origin
)

Object._create = function(origin) {
	const F = function() {}
	origin = F.prototype
	return new F()
}

const c = Object.create(origin)

console.log(
	Object.getPrototypeOf(c) === origin,
	c.__proto__ === origin
)