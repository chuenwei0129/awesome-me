// 有状态的组件没有渲染，有渲染的组件没有状态
// “有状态的组件没有渲染”：
// 包含实际业务状态的组件不应该进行视图的渲染，而是应该将实际业务状态传递给子孙组件，让子孙组件来进行视图渲染；
// “有渲染的组件没有状态”：
// 能够进行视图渲染的组件，不要包含实际的业务状态，而是通过接受父辈的参数来进行渲染；
// 这样的话，有渲染的组件没有实际的业务状态，就与实际的业务解耦了，能够更好的服务于其他的有状态的组件，实现组件的复用。

// 视图与状态管理分离，导致视图没法自包含内聚，所以，我们所说的的组件应该是业务组件而非通用组件，
// 每个业务组件，不应该自己管理状态，应该承接给一个不负责渲染的状态容器

// 看了一下评论, 是不是意思就是说需要将组件分成容器组件(container) 和展示形(presentation)组件,
// 例如实际应用中, 容器组件负责 connect 到 redux 中, 再将包装好的方法传入到展示形组件中,
// 展示型组件调用容器组件提供的方法, 只负责数据的渲染, 实际状态等还是提升到容器组件中进行处理?

// 我更倾向于叫 Controller 层和 Presentation 层，比如一个组件根据参数获取一个列表数据，
// 再展示成一个表格。那它就可以是一个组件负责获取数据，另一个组件负责表格展现，而不是混在一起

// Suspense 利用异常做逻辑流控制 整体上基于 React 16 的 Error Boundary
// 随后才是 Suspence 这个非常具备破坏力的炸弹，实际则是通过 Error Bounday 和 Promise 的类型判断来完成。

// 为何没有将状态进行更细粒度的拆分，没有联动关系的状态放到不同的组件中单独管理，而是习惯性地使用一个大的状态，以及多处 setState 进行部分状态的更新。
// 我的理解还是要把握一个度的，如果拆分的过细，很难对组件有一个「宏观」的把控，理解一个「功能」需要在多个文件来回跳转，会很累很累

// 为何没有将状态的管理与视图的渲染进行隔离，把一个带有复杂的 render 实现的类组件拆分为一个“单纯管理状态的类组件”和一个“实现渲染逻辑的纯函数组件”，并让前者的 render 方法直接返回后者。

// 里的「为何没有将状态的管理与视图的渲染进行隔离」，现在 redux 或其它状态管理库做的不是将状态、组件分开的内容嘛。对这一点不是很理解

// 我觉得还好吧，但你把组件拆分得很细了以后（既一个组件只做一件事情），然后你的大组件都是用这些细组件拼起来的，你觉得你看这个大组件还要到处乱跳吗。。毕竟每个组件你都知道是做什么的

// 调用 render 函数->发现有异步请求->悬停，等待异步请求结果->再渲染展示数据
// try handle

// 由此可以看到，我们可以用一种同步的方式去书写代码，就像我们写 async/await 一样！是不是非常的爽！？这就是 Suspense 的核心功能

// data.pipe(fetch) => view

// 做什么，怎么做，x 可以是 异步的 io
// data.pipe(x).pipe(y).pipe(z).render(data)

// const FunctionComponent = props => {
// // 对所有 Hooks 的调用，声明前置条件

// // 对 props 及 hooks 提供的内容的运算处理，数据加工

// // 将数据转变为 JSX 并返回
// };

// 如果除去 useState 的一行，将 text 和 onChange 作为组件的 props 输入，这一组件就是完美的“输入到输出的映射逻辑”，即将 2 个属性映射为一组 React 元素。

// 而在基于 Hooks 的实现之下，useState 这一行本质上是在声明后半部分（return）“依赖于一个状态”这一事实。

// 为何没有将“状态”与“变更状态的逻辑”两两配对，用更好的代码结构来组织它们。
// 为何没有将状态进行更细粒度的拆分，没有联动关系的状态放到不同的组件中单独管理，而是习惯性地使用一个大的状态，以及多处 setState 进行部分状态的更新。
// 为何没有将状态的管理与视图的渲染进行隔离，把一个带有复杂的 render 实现的类组件拆分为一个“单纯管理状态的类组件”和一个“实现渲染逻辑的纯函数组件”，
// 并让前者的 render 方法直接返回后者。

// 将组件的状态分为 2 部分，一部分为自己生成自己管理的自治状态（owned），另一部分为由 props 计算得来的衍生状态（derived）。在初始化状态时，仅初始化自治状态，将原生状态赋为 null，
// 并在 getDerivedStateFromProps 中再进行初始化（即便在构造函数中可以完成衍生状态的计算）。

// 数据在哪里（grab）：当数据有的时候，就没必要发起请求，这是一个很直接的逻辑。
// 数据与什么相关（selector）：可以认为这是“获取数据的参数”，仅当参数发生变化时，请求才会被重新发起（当然数据不存在依然是前提）。
// 怎么发起请求（fetch）：真正的请求逻辑。

// 这是我对 React Hooks 最为担忧的一点。虽然社区里对 Hooks 的支持普遍来自于“原有的 React 组件嵌套太深”这一观点，但是于我而言，一定的组件嵌套实际是有很好的正面作用的。

// 通常设计一个函数返回 Tuple，有明确的“我就是想让你解构开来”的意图，并且 Tuple 中靠前的元素总是比靠后的元素更常用到（不然解构很丑）
// 还有一个原因，Tuple 解构可以很轻松重命名，而对象解构必须保证名字一样。

// 因为 hook 本身并不是组件的实现，所以是获取不到 props 的，因此 hook 不会有“从 props 中获取 isLoading”这个逻辑，而是直接接收 isLoading 的值就行：
// 对应 react 把逻辑提出来了，不需要高姐组件 props 传递一些

// 一些总结
// 如果觉得实现 hook 没有思路，可以先实现 HOC 再翻译过来。
// 组件的重要功能几乎都有 hook 的对应，主要的 setState -> useState 和生命周期转为 useEffect。
// useEffect 一共有 3 部分，即本体、返回的清理函数、依赖数组，分别对应生命周期的主要部分、componentDidUpdate 和 componentWillUnmount 里的清理逻辑、componentDidUpdate 里的 if 分支用到的属性。
// 可以把原来用于 HOC 的展示组件继续复用，以前是包一层 HOC，现在是新加一个组件先调用 hook 再渲染组件。当然这样依旧会造出组件树上多一个节点，是否要合并可以自行权衡。
// Hook 的一个特征是不访问 props，因此通常调用 HOC 时传的 propName 之类的参数，在 hook 里会消失，变为直接将对应的属性值传过去。
// 除此这外，hook 还提供了一系列和原有的概念对应的东西：

// useCallback 和 useMemo 对应以前 reselect 库提供的选择器，是 react 生态中非常重要的一环。
// useContext 对应<Consumer>的使用以及诸如 withRouter、connect 等主流库的 API。
