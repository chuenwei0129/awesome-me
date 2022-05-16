// 同步 try catch
const a = () => {}
const b = () => {}
const c = () => {}

try {
  a(b(c()))
} catch (err) {
  console.log('err: ', err.message)
}

// 异步 try catch
const f = () => {
  setTimeout(() => {
    throw new Error('error')
  }, 0)
}

try {
  f()
} catch (error) {
  console.log('err: ', err.message)
}

// promise try catch
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('error'))
  }, 0)
})

try {
  p.then(() => {
    console.log('success')
  })
} catch (error) {
  console.log('err: ', err.message)
}
