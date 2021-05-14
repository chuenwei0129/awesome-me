const test = async () => {
  console.log('1')
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
  console.log(data)
  console.log('3')
}

test()
