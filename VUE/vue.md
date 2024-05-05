## 1. Vue 的响应式原理
   Vue 的响应式是通过 Object.defineProperty 对数据进行劫持，并结合观察者模式实现。 Vue 利用 Object.defineProperty 创建一个 observe 来劫持监听所有的属性，把这些属性全部转为 getter 和 setter。Vue 中每个组件实例都会对应一个 watcher 实例，它会在组件渲染的过程中把使用过的数据属性通过 getter 收集为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
## 2.vue组件间传值方法，==>手写事件总线（发布订阅模式）
  ```js
      //兄弟组件中的传值 中央事件总线
      this.$bus.$emit('foo')
      this.$bus.$on()

  ```
  ## 3.sync修饰符（子改父值）
  其实内部也是使用了子传父值
  ## 4 vue路由跳转方式，传参方式对比react
  ```js
   vue 
   1：跳转方式==>1.声明式跳转 
                         <router-link :to="{name:'home'}"> 
                         <router-link :to="{path:'/home'}">
                 2.编程式路由跳转
               //   query传参
                      this.$router.push({name:'home',query: {id:'1'}})
                        this.$router.push({path:'/home',query: {id:'1'}})
                        // 
                     (params传参）只可以使用name
                  this.$router.push({name:'home',params: {id:'1'}}) 


                  // 
          使用query参数时，在路由跳转完后，其参数会显示在url的后面 ，如果参数较多会导致url过长。但页面刷新时，query参数不会被清空 。
而使用params参数时，在路由跳转完后，其参数不会显示在url的后面。但页面刷新或者回退时，params参数会被清空。因此，要想保留params参数，需将其保存在localStorage中。 在 created 生命周期时先获取缓存数据，在页面销毁时删除缓存。




  ```
 ## 5、hash模式和history模式
    1.原理不同。
    hash模式的实现原理是通过监听hashChange事件来实现的，前端js把当前hash地址对应的组件渲染到浏览器中。history模式是通过调用 history.pushState方法(或者replaceState) 并且 监听popstate事件来实现的。
    2.表现不同。
    hash模式会在地址栏中有#号，而history模式没有；同时由于history模式的实现原理用到H5的新特性，所以它对浏览器的兼容性有要求(IE >= 10)。

    3.history模式特点
    history模式开发的SPA项目，需要服务器端做额外的配置，否则会出现刷新白屏（链接分享失效）。原因是页面刷新时，浏览器会向服务器真的发出对这个地址的请求，而这个文件资源又不存在，所以就报404。处理方式就由后端做一个保底映射:所有的请求全部拦截到index.html上。
 ## 6、为什么vuex的mutations必须是同步函数？不能做异步操作？
 在 Vuex 中，mutations 必须是同步函数而不能进行异步操作的原因是为了确保状态的变更是可追踪和可预测的。

Vuex 的核心理念之一是单一状态树 (Single State Tree)，即整个应用的状态被存储在一个统一的状态树中。这种设计使得状态的变更变得可追踪和可预测，便于调试和维护。

当使用 mutations 修改状态时，Vuex 会记录下每一个 mutation 的操作，包括状态的修改前后的值。这些记录可以用于开发工具中的状态追踪、时间旅行调试等特性。

如果允许 mutations 异步执行，比如包含异步 API 请求、定时器等操作，就会导致状态变更的顺序和时机变得不可预测。这将破坏 Vuex 的状态追踪和可预测性，使调试和维护变得困难。

为了遵循 Vuex 的设计原则，如果需要执行异步操作，可以将异步操作放在 actions 中，而不是 mutations。Actions 允许包含异步操作，并且可以调用 mutations 来修改状态。这样可以确保状态的变更仍然是同步的、可追踪的，并且异步操作的结果可以通过 actions 的返回值或 Promise 进行处理。

总结起来，Vuex 中的 mutations 必须是同步函数，这是为了保持状态的可追踪和可预测性。如果需要进行异步操作，应该将其放在 actions 中，并在 actions 中调用 mutations 来修改状态。
 ## 7、nextTick的实现
 1、nextTick是Vue提供的一个全局API,是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM；
  2、Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启1个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中-次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用；
 3、比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
  4、我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

  答二：
  nextTick是等待下一次DOM更新刷新的工具方法。
  vue有个异步更新策略，意思是如果数据变化，vue不会立刻更新dom，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新，这一策略导致我们对数据修改不会立刻体现在dom上，所以需要使用nextTick。
  在vue内部，nextTick之所以能让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数
  (flushSchedulerQueue)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也结束了，callback自然也能获取最新的dom值。
  将传入的回调函数包装成异步任务，异步任务又分微任务和宏任务，为了尽快执行所以优先选择微任务
  提供了四种异步方法
  Promise.then,MutationObserver.setImmediatesetTimeout


## 8、vue install 和vue.use的区别

 ## 9、vue有几种模式，实现原理是什么
  1.hash模式
  hash模式是利用URL中的hash(#)来实现的。通过监听hashchange事件来触发路由的切换。
  2.history模式
  history模式是利用HTML5中的history API来实现的。通过调用history.pushState()方法来改变URL，然后监听popstate事件来触发路由的切换。
  3.vue-router的实现原理
  问题: Hash路由和History模式路由的区别，分别是如何实现的?
答案:   hash路由基于URL中的#来改变当前页面状态，window.location.hash   vue下的hash模式，window.onhashchange
history路由：利用h5 history api来操作浏览器的历史记录栈history.pushstate hhistory.replacestate监听window.onpopstate