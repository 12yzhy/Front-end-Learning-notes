# 1 你了解$nextTick 吗，

1.  dom 的异步更新机制。2.事件循环机制

# 2 如何封装一个组件;需要满足什么条件

原则：把功能拆开；尽量让组件原子化，一个组件做一件事；容器组件管数据，展示组件管视图
1 低耦合，组件之间的依赖越小越好。
2 最好从父组件中传入信息，不要再组件内部请求数据
3 传入的数据需要校验。
4 处理事件的方法写在父组件中。

# 3 react 的 diff 算法和 vue 的 diff 算法区别

React 和 Vue 的 diff 算法都是为了优化虚拟 DOM 的更新性能，但它们的实现方式略有不同：

React 的 diff 算法采用的是双端比较，即从根节点开始同时遍历新旧虚拟 DOM 树，并按需新增、删除、移动或更新对应的 DOM 节点。React 还针对同层级子节点进行了一些优化，如 key 属性的使用可以减少节点重新排序的情况。

Vue 的 diff 算法则是采用的“先序深度优先遍历”，即按照节点的先后顺序依次比较新旧节点，如果节点类型相同且属性相同，则认为这个节点是相同的，否则就需要替换成新的节点。Vue 还有一个优化方式是借鉴了 React 的 key 属性，通过标记静态节点可以跳过对这些节点的 diff 过程。

总体来说，React 和 Vue 的 diff 算法都是为了最小化 DOM 操作次数，提高页面渲染性能。具体实现上，React 更注重节点的移动和重复利用，而 Vue 则更注重节点的复用和缓存

# 4 vue2 和 vue3diff 算法详解

Vue 2.x 和 Vue 3.x 在虚拟 DOM diff 算法上都进行了一些优化，具体如下：

Vue 2.x 的虚拟 DOM diff 算法基于“先序深度优先遍历”，对比新旧节点时需要遍历整个树。如果发现某个节点类型不同，则该节点以及其子节点都会被替换；如果发现两个节点类型相同但属性不同，则只更新这个节点的属性；如果两个节点相同，则继续比较其子节点。

Vue 3.x 的虚拟 DOM diff 算法采用了类似 React 的双端比较策略。首先对新旧节点数组的开头和结尾节点进行比较，然后移动指针进行逐个比较，直到新旧节点数组的任意一个指针超过了数组长度，此时剩余的节点就可以直接插入或删除。

除了优化 diff 算法，Vue 3.x 还引入了静态提升和模板编译缓存等机制，大幅提高渲染性能。

总体来说，Vue 3.x 的虚拟 DOM diff 算法比 Vue 2.x 更快、更灵活。但需要注意的是，在实际应用中，由于页面结构复杂度、数据量等因素的影响，不同场景下两者的性能表现可能有所不同

# 5 Vue3 的 diff 算法相比于 Vue2 有以下几个优点：

不再使用递归，避免了递归造成的栈溢出问题；
可以通过对比头尾节点直接复用并删除部分节点，减少了操作次数；
通过对比记录可以一次性执行所有变更，减少了多次操作带来的性能损耗。

# 6 vue3对比vue2的diff算法优化(增加)了什么
Vue 3 在虚拟 DOM 的 diff（差异）算法方面进行了一些优化，以提高性能和渲染效率。下面是一些 Vue 3 在 diff 算法上的优化：

1. 静态标记 (Static Marking)：Vue 3 在编译阶段能够检测到静态节点（不会随着数据变化而改变的节点），并对它们进行标记。在 diff 算法中，Vue 3 可以跳过静态节点的比较和更新过程，从而减少了不必要的操作，提高了渲染性能。

2. 长列表的优化：对于长列表的渲染，Vue 3 引入了一种新的 diff 算法，称为“Fragments + List Patching”。它通过将列表分割为多个片段（Fragments）并进行增量式的渲染，而不是一次性地对整个列表进行比较，从而提高了性能。

3. 静态提升 (Static Hoisting)：Vue 3 在编译阶段可以将静态子树提升为常量，这样在每次渲染时就无需重新创建这些静态子树，减少了虚拟 DOM 的创建和比较过程，提高了渲染速度。

4. 缓存事件处理器 (Event Handler Cache)：Vue 3 在渲染过程中会缓存事件处理器，避免不必要的重新创建，提高了性能。

5. 模板中的静态提升和动态提升：Vue 3 在编译阶段对模板进行了静态分析，并将静态内容和动态内容分开处理。静态内容可以在编译时进行处理，而动态内容则使用更高效的渲染方式，从而提高了渲染性能。

这些优化措施使得 Vue 3 的 diff 算法更加高效，减少了不必要的操作和比较，提高了渲染性能和整体的性能表现。

需要注意的是，这仅是一些 Vue 3 在 diff 算法方面的优化，实际上 Vue 3 还有其他方面的改进，如编译器的优化、渲染流程的优化等，这些综合起来使得 Vue 3 在性能方面相较于 Vue 2 有了显著的提升。

希望能解答你的问题！如果还有其他疑问，请随时提问。


# 6.5 vue2 双指针和vue3 最长递增子序列
# 7 nextick 作用和原理
1. 作用：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
2. 原理：在 Vue 2 中，nextTick 实现原理是利用了宏任务和微任务，在下次 DOM 更新循环结束之后执行延迟回调。在 Vue 3 中，nextTick 实现原理是利用了 Promise，在微任务队列中添加一个回调函数，当所有微任务执行完毕后执行延迟回调。
源码位置：/src/core/util/next-tick.js 
其中  timerFunc函数定义，这里是根据当前环境支持什么方法则确定调用哪个，分别有：

Promise.then、MutationObserver、setImmediate、setTimeout
## 7.1 MutationObserver怎么使用
`MutationObserver` 是一种能够响应DOM树变动的Web API，它可以观察到几乎所有类型的DOM变动，包括属性和子节点的变动。使用 `MutationObserver` 可以实现以前只能通过 `Mutation Events` （已废弃）来完成的任务。

以下是如何使用 `MutationObserver` 的基本步骤：

### 1. 创建 `MutationObserver` 实例

```javascript
const observerCallback = (mutationsList, observer) => {
  // 处理变动列表
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

const observer = new MutationObserver(observerCallback);
```

### 2. 配置观察者

你需要指定两个东西来配置观察者：

- 目标节点（要观察的DOM元素）。
- 观察选项（要观察哪些变动）。

```javascript
const targetNode = document.getElementById('some-id');
const config = {
  attributes: true, // 观察属性变动
  childList: true,  // 观察子节点的增减变动
  subtree: true     // 观察后代节点
};

observer.observe(targetNode, config);
```

### 3. 处理变动

在 `observerCallback` 函数中，你将接收到一个 `mutationsList` 对象，它包含了所有自上一次通知以来发生的变动。每个变动都是一个 `MutationRecord` 对象，它包含了变动的详细信息。

### 4. 停止观察

如果你希望停止观察，可以调用 `MutationObserver` 的 `disconnect` 方法。

```javascript
observer.disconnect();
```

### 示例

下面是一个完整的例子，展示了如何使用 `MutationObserver` 观察一个DOM元素的属性和子节点变动：

```javascript
// 1. 创建观察者实例，传入回调函数
const observerCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      console.log(`Attribute ${mutation.attributeName} was ${mutation.oldValue} and is now ${mutation.target[mutation.attributeName]}`);
    }
    if (mutation.type === 'childList') {
      console.log('A child has been added or removed.');
    }
  }
};

const observer = new MutationObserver(observerCallback);

// 2. 选择目标节点
const targetNode = document.querySelector('#some-id');

// 3. 配置观察选项
const config = {
  attributes: true,  // 观察属性变动
  childList: true,   // 观察子节点的增减变动
  subtree: true      // 观察后代节点
};

// 4. 开始观察
observer.observe(targetNode, config);

// 5. 停止观察
// observer.disconnect();
```

使用 `MutationObserver` 可以非常精确地响应DOM的变动，非常适合需要对DOM变动做出响应的高级应用场景。不过也要注意，过度使用可能会对性能产生影响，因为每次DOM变动都会触发回调函数。
 
# 8 说一下vue中effect 收集依赖




# 9 monorepo  软、硬连接  element-plus 源码
# 10 vite ==>rollup（开发） +esbuild(生产)
# 11 两套系统 ==>单点登录 ==>sso   
# 12 vue 响应式原理本质
函数与数据的关联
函数：
vue2 watcher 
vue3 effect、render watcheffect、computed watch
数据：响应式数据、必须在函数中用到

数据改变，render等函数重新执行 

# 13 为甚么需要虚拟Dom 
在vue中，渲染视图会调用render函数，这种渲染不仅发生在组件创建时，同时发生在视图依赖的数据更新时。如果在渲染时，直接使用真实DOM，由于真实DOM的创建、更新、插入等操作会带来大量的性能损耗
八股文的说法是操作真实dom耗费性能，虚拟dom更高效
真实情况有两个方面考虑
1. 框架设计：从框架设计的角度，（它是数据驱动的当数据变化时，框架不知道哪个地方需要改动，它只能全量更新一遍，如果不断更新但这样对浏览器的性能消耗太高，退而求其次有了虚拟dom）虚拟dom可以提高框架的性能和效率。虚拟dom可以减少对真实dom的频繁操作，从而减少浏览器的重绘和重排。
而sevlte可以在
2. 跨平台：虚拟dom还可以用于跨平台开发。在移动端开发中，虚拟dom可以减少对原生平台的依赖，提高跨平台开发的效率。

## 13.1  什么是虚拟dom？
虚拟dom本质上就是一个普通的JS对象，
用于描述视图的界面结构在vue中，每个组件都有一个render函数，每个render函数都会返回一个虚拟dom树，这也就意味着每个组件都对应一棵虚拟DOM树