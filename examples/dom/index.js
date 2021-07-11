// const nodeList = document.querySelectorAll('*')

// 计数器是返回对象的值
// function getMaxHtmlTag(nodeList) {
// 	const res = {}
// 	;[...nodeList].forEach(el => {
// 		if (!res[el.tagName]) {
// 			res[el.tagName] = 1
// 		} else {
// 			res[el.tagName]++
// 		}
// 	})
// 	return res
// }

// console.log(getMaxHtmlTag(nodeList))

// map + reduce

const tagsMap = [...document.querySelectorAll('*')]
  .map(el => el.tagName)
  .reduce((res, cur) => {
    res[cur] = !res[cur] ? 1 : res[cur] + 1
    return res
  }, {})

console.log(tagsMap)
