//数组拍平 flatternArray(arr,count)

console.log(flatternArray([1, 2, 3, [4, [5]]], 1)) // [1, 2, 3, 4, [5]]
console.log(flatternArray([1, 2, 3, [4, [5]]], 2)) // [1, 2, 3, 4, 5]

function flatternArray(arr, depth) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item) && depth > 0) {
      return [...result, ...flatternArray(item, depth - 1)]
    } else {
      return [...result, item]
    }
  }, [])
}
