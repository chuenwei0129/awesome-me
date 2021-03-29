function loader(source) {
	console.log('loader2 执行')
	return source
}

loader.pitch = function() {
	return 'loader stop'
}

module.exports = loader