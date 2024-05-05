## 1. 说一下 react 的闭包陷阱

常见的闭包陷阱是在使用 setState 时捕获状态变量的值，而不是使用回调函数。这会导致在更新状态之前，使用的值会过时。

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    // 错误写法
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick.bind(this)}>Click me</button>
      </div>
    );
  }
}
// 在这个例子中，handleClick方法中使用了this.state.count，但它并没有在回调函数中使用。因此，每次点击按钮时，都会使用旧的count值来更新状态，而不是当前状态。要解决这个问题，我们需要将handleClick方法改为使用回调函数：
// handleClick() {
//   this.setState(prevState => ({ count: prevState.count + 1 }));
// }
```

## 2.vue 和 react 的 diff 算法的区别

数据流：Vue 使用双向数据绑定的方式来管理应用程序状态，而 React 推崇单向数据流（自上而下）的方式来更好地控制应用程序状态。

性能：React 的性能比 Vue 更高效，因为 React Fiber 可以实现异步渲染和增量更新，而 Vue 的响应式系统会在大量数据变动时有性能问题。
diff 算法：对 dom 进行 different 比较不同的一种算法（虚拟）

共同点：vue 和 react 的 diff 算法，都是不进行跨层级比较，只做同级比较

不同点：

        1.vue进行diff时，调用patch打补丁函数，一边比较一边给真实的dom打补丁，vue对比节点时，当节点元素类型相同，类名不同时，认为是不同的元素，删除重新创建，而react认为是同类型的节点，进行修改操作

        2.vue列表对比的时候，采用从两端到中间的方式，旧集合和新集合两端各存在两个指针，两两进行比较，每次对比结束后，指针向队列中间移动；react则是从左往右一次对比，利用元素的index和lastindex进行比较

        3.当一个集合把最后一个节点移动到最前面，react会把前面的节点依次向后移动，而Vue只会把最后一个节点放在最前面，这样的操作来看，Vue的diff性能是高于react的

## 3.React Fiber 是什么

是 React v16 引入的一种新的协调算法，用于实现 React 应用程序中的异步渲染和增量更新。它通过将渲染工作分解成较小的任务单元，并使用优先级调度算法来确定哪些任务需要在任何给定时间点执行，从而提高了应用程序的性能和用户体验

## 4.什么是单页面应用

单页面应用（Single Page Application，SPA）是一种 Web 应用程序的架构模式，它通过动态加载页面内容来实现在单个页面上交互和导航。与传统的多页面应用相比，SPA 可以提供更好的用户体验和性能，因为在 SPA 中，所有需要更新的内容都是通过 AJAX 或 WebSocket 动态获取并呈现，而不需要重新加载整个页面。

在 SPA 中，通常使用一些流行的前端框架，如 React、Vue 和 Angular 等，并且常常使用路由器（router）来处理 URL 和页面之间的映射关系。由于 SPA 的特殊性质，开发者需要特别注意 SEO（搜索引擎优化）、浏览器的前进后退功能等问题。

## 5 React 组件可以分为两种类型：类组件和函数式组件(16.8 以后)。

类组件有自己的状态和生命周期方法，而函数式组件没有。类组件可以使用 this 关键字访问组件的属性和方法，而函数式组件只接收 props 参数并返回一个 React 元素。

类组件需要继承 React.Component 类，并实现 render()方法来渲染组件，而函数式组件只需要定义一个函数来返回要渲染的 React 元素。

类组件在处理复杂逻辑和状态管理时更加灵活和强大，而函数式组件在处理简单组件和纯展示组件时更加简单和高效。

在 React 16.8 版本之前，类组件是唯一一种可以使用 React 的钩子函数的组件类型。而在 React 16.8 版本之后，函数式组件也可以使用钩子函数，使得函数式组件更加灵活和强大。



## 6 如何使用usecontex和useReducer模拟redux
```js
import React, { createContext, useContext, useState ，useReducer} from 'react';
// 创建上下文
const CountContext = createContext(undefined);

// 创建Reducer 函数
const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
        case 'ADDTEN':
            return { ...state, count: state.count+action.payload };
      default:
        return state;
    }
  };

// 提供器组件
const CountProvider: React.FC = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, {
    count: 0,
    nameSpace:'ceishi'
  });
const contextValue: CountContextProps = {
    count,
    dispatch,
  };
  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

// 消费者组件
const Counter: React.FC = () => {
  const { count, dispatch } = useContext(CountContext)!;
 const increment = () => {
            dispatch({ type: 'INCREMENT' });
          };
        
          const decrement = () => {
            dispatch({ type: 'DECREMENT' });
          };
  

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// 应用程序组件
const App: React.FC = () => {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
};

export default App;


```

## 7 dva流程   
   dispatch 一个对象（包含type和payload），到effect中，effect会put到reducers  会更改state值


## 8 dva 中的connect方法是基于 react-redux 库实现的，那么react-redux中的connect如何实现？
`react-redux` 提供的 `connect` 函数是基于 React 的上下文（context）和高阶组件（Higher-Order Component，HOC）的原理来实现的。下面是 `connect` 函数的大致实现流程：

1. 首先，`connect` 函数接收两个参数：`mapStateToProps` 和 `mapDispatchToProps`。

2. 当被连接的组件被渲染时，`connect` 函数会创建一个新的高阶组件。

3. 这个高阶组件会通过 React 的上下文（context）向下传递数据模型的状态和派发 action 的方法。

4. 在高阶组件内部，它会获取数据模型的状态和派发 action 的方法，并将它们作为属性传递给被连接的组件。

5. 当数据模型的状态发生变化时，高阶组件会重新渲染，并将最新的状态作为属性传递给被连接的组件。

6. 当被连接的组件需要派发 action 时，它会通过高阶组件提供的方法来触发对数据模型的更新操作。

具体而言，`connect` 函数的实现可以分为以下几个步骤：

1.（重点） 在高阶组件内部，通过 `React.createContext()` 创建一个 React 上下文对象，用于传递数据模型的状态和派发 action 的方法。

2. 在高阶组件的 `componentDidMount` 生命周期函数中，订阅数据模型的状态变化，并将最新的状态更新到高阶组件的状态中。

3. 在高阶组件的 `componentWillUnmount` 生命周期函数中，取消对数据模型状态变化的订阅。

4.（重点） 在高阶组件的 `render` 方法中，将数据模型的状态和派发 action 的方法作为属性传递给被连接的组件。

5. 在被连接的组件中，通过 `this.props` 访问数据模型的状态和派发 action 的方法。

总的来说，`connect` 函数的实现利用了 React 的上下文和生命周期方法，以及高阶组件的特性，实现了将数据模型与组件进行连接的功能。通过这种方式，组件可以轻松地访问数据模型的状态，并触发对数据模型的更新操作。

## 9 react可以提升性能的hook有哪些
  useMemo
  useCallback
  useRef
  useImperativeHandle
  useLayoutEffect
  useDebugValue

## 10 react.memo()方法第二个参数是什么，什么作用
第二个参数是一个函数，用于判断两个props是否相同。如果返回true，则不会重新渲染组件；如果返回false，则重新渲染组件。

## 11 react 的设计思想
 1. 组件化==> 开闭原则 封闭：组件内部状态自身维护只处理内部渲染逻辑
                       开放：组件通信，不同组件props单项数据流进行交互

2. 数据驱动视图
 ui= f(data)
不能直接操作dom 修改数据state props 数据驱动视图更新
3. 虚拟dom 
  1. DOM  操作消耗性能  ==>vDOM    
   2. new vdom old vdom diff  ==>增量更新