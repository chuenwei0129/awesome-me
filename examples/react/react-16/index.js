function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = key => key !== 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      console.log(element.props);
      dom[name] = element.props[name];
    });

  element.props.children.forEach(child => render(child, dom));

  container.appendChild(dom);
}

const Creact = {
  createElement,
  render
};

// 初始化工作单元
let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  // 工作单元存在，并且不需要暂停
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    // 回调函数入参 deadline 可以告诉我们在这个渲染周期还剩多少时间可用
    // 剩余时间小于1毫秒就退出回调，等待浏览器再次空闲
    shouldYield = deadline.timeRemaining() < 1 // true，跳出循环
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop) //递归调用

// 注意，这个函数执行完本次单元任务之后要返回下一个单元任务
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}


const element = Creact.createElement('div', {id: 'app'}, Creact.createElement('h1', {}, 'Creact'), Creact.createElement('p', {}, 'hello world'))

console.log(element);

const container = document.getElementById('root');

Creact.render(element, container);