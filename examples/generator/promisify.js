const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, 'test.txt'), 'utf-8', (err, data) => {
	if (err) {
		console.log(err)
	} else {
		console.log(data)
	}
})

const promisify = (readFile) => {
	return (...args) => {
		return new Promise((resolve, reject) => {
			readFile(...args, (err, data) => {
				if (err) reject(err)
				resolve(data)
			})
		})
	}
}

const promises = (fs) => {
	for (const [k, v] of Object.entries(fs)) {
		if (typeof v === 'function') {
			fs[k] = promisify(v)
		}
	}
	return fs
}

const _fs = promises(fs)

_fs.readFile(path.resolve(__dirname, 'test.txt'), 'utf-8').then(data => {
	console.log(data)
})