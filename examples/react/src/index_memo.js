import {
  createContext,
  memo,
  StrictMode,
  useContext,
  useMemo,
  useState
} from 'react'
import ReactDOM from 'react-dom'

// 利用 hoc 来规避掉使用 useContext 导致的 force update，再用 memo 隔离真实渲染组件。（实际上 rerender context倒没什么开销）。
// 相当于自己实现的 selector
// useMemo 不需要独立出来一个组件，单独组件还是需要 memo 缓存

const AppContext = createContext()

function App() {
  console.log('app render')
  const [childNum, updateChildNum] = useState(0)
  const [sonNum, updateSonNum] = useState(0)

  return (
    <AppContext.Provider value={{ childNum, sonNum }}>
      <Father></Father>
      <button onClick={() => updateChildNum(childNum + 1)}> + child </button>
      <button onClick={() => updateSonNum(sonNum + 1)}> + son </button>
    </AppContext.Provider>
  )
}

const Father = memo(() => {
  console.log('father render')
  return [<ChildSelector></ChildSelector>, <SonSelector></SonSelector>]
})

function ChildSelector() {
  console.log('hoc child context select render')
  const { childNum } = useContext(AppContext)
  // 缓存真实渲染的 jsx
  return useMemo(() => <h1>child: {childNum}</h1>, [childNum])
}

function SonSelector(props) {
  console.log('hoc son context select render')
  const { sonNum } = useContext(AppContext)
  return <Son sonNum={sonNum}></Son>
}

const Son = memo(({ sonNum }) => {
  console.log('Son render')
  return <h1>child: {sonNum}</h1>
})

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
