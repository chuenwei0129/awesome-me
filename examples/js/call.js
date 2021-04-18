const foo = {
	val: 1
}

function bar() {
	return this.val
}

console.log(
	bar.call(foo)
	// bar.call(1)
)

Function.prototype._call = function(thisArg, ...args) {
	// Object(thisArg) 是为了防止 19 行出现数字 2..tofixed()
	thisArg = thisArg ? Object(thisArg) : globalThis
	const key = Symbol('key')
	thisArg[key] = this
	const ret = thisArg[key](...args)
	delete thisArg[key]
	return ret
}

console.log(
	bar._call(foo)
	// bar._call(1)
)