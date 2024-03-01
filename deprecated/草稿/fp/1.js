function fmtMemoryInMB() {
  const memNow = process.memoryUsage().rss
  return Math.round((memNow / 1024 / 1024) * 100) / 100 + 'MB'
}

const initMemory = fmtMemoryInMB()

function showMemory() {
  process.stdout.write(`${initMemory} -> ${fmtMemoryInMB()}    \r`)
}

let blah = null

function replaceThing() {
  showMemory()
  let leak = blah
  blah = {
    longStr: Array.from({ length: 10000 }).fill(0),
    someMethod: () => !!leak,
  }
}

setInterval(replaceThing)
