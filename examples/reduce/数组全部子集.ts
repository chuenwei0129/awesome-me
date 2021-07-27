console.log([1, 2, 3].reduce((t, item) => t.concat(t.map(v => v.concat(item))), [[]]))
