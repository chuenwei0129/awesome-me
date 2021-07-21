// 邻接矩阵
// 浪费内存 添加删除麻烦
// 邻接表
// A => BCD
// B => AEF
// C => AD
// D => AC
// E => B
// F => B

class Graph {
  private _vertexes: string[]
  // 与顶点相连的顶点的集合字典
  private _linkedVertexesMap: {}
  constructor() {
    this._vertexes = []
    this._linkedVertexesMap = {}
  }

  private _initVertexStateColor() {
    // 定义初始化状态颜色
    // white 代表 未发现
    // grey 代表 已发现待处理
    // black 代表 已处理
    const vertexStateColorMap = {}
    this._vertexes.forEach(v => {
      // 初始化所有状态为 'white'
      vertexStateColorMap[v] = 'white'
    })
    return vertexStateColorMap
  }

  // 初始化距离和回溯点
  private _initDistanceAndPred() {
    const distanceMap = {}
    const predMap = {}
    this._vertexes.forEach(v => {
      // 初始化所有状态为 'white'
      distanceMap[v] = 0
      predMap[v] = null
    })
    return [distanceMap, predMap]
  }

  private _dfs(vertex: string, callback: (v: string) => void, colorMap) {
    // 状态已发现
    colorMap[vertex] = 'grey'
    // 发现新节点
    this._linkedVertexesMap[vertex].forEach(v => {
      if (colorMap[v] === 'white') {
        this._dfs(v, callback, colorMap)
      }
    })
    // 状态已处理
    callback(vertex)
    colorMap[vertex] = 'black'
  }

  addVertex(v: string) {
    this._vertexes.push(v)
    // 顶点对应的相连顶点集合
    this._linkedVertexesMap[v] = []
  }

  // 顶点 v1 v2 连接
  connectLinkedVertexes(v1: string, v2: string) {
    // 双向
    this._linkedVertexesMap[v1].push(v2)
    this._linkedVertexesMap[v2].push(v1)
  }

  // bfs
  bfs(rootVertex: string, callback?: (v: string) => void) {
    let vertexStateColorMap = this._initVertexStateColor()
    let [distanceMap, predMap] = this._initDistanceAndPred()

    const queue = [rootVertex]

    while (queue.length > 0) {
      // root顶点默认已发现初始化入队时已经 grey 了 出队处理 black
      const currentVertex = queue.shift()
      this._linkedVertexesMap[currentVertex].forEach(linkedVertex => {
        if (vertexStateColorMap[linkedVertex] === 'white') {
          // 未发现全部入列待处理
          vertexStateColorMap[linkedVertex] = 'grey'
          queue.push(linkedVertex)
          // 设置回溯点
          predMap[linkedVertex] = currentVertex
          distanceMap[linkedVertex] = distanceMap[currentVertex] + 1
        }
      })

      vertexStateColorMap[currentVertex] = 'black'

      callback && callback(currentVertex)
    }

    return [predMap, distanceMap]
  }

  // dfs
  // 颜色是避免重复
  dfs(rootVertex: string, callback: (v: string) => void) {
    const colorMap = this._initVertexStateColor()
    this._dfs(rootVertex, callback, colorMap)
  }
}

const g = new Graph()

g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')
g.addVertex('F')

g.connectLinkedVertexes('A', 'B')
g.connectLinkedVertexes('A', 'C')
g.connectLinkedVertexes('A', 'D')
g.connectLinkedVertexes('B', 'E')
g.connectLinkedVertexes('B', 'F')
g.connectLinkedVertexes('C', 'D')

g.bfs('A', v => {
  console.log(`节点依次为：`, v)
})

const getMinDistance = (from: string, to: string) => {
  const [p, d] = g.bfs(from)
  const stack = [to]
  const distance = d[to]
  let path = ''

  while (to !== from) {
    to = p[to]
    stack.push(to)
  }

  while (stack.length > 0) {
    path = path + ' => ' + stack.pop()
  }

  return [path, distance]
}

const [p, d] = getMinDistance('A', 'F')

console.log(`最短路径`, p)
console.log(`最短路径长度`, d)

// 深度
g.dfs('A', v => {
  console.log(`节点依次为：`, v)
})
