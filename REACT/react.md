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
