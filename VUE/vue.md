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
 ## hash模式和history模式
 1.原理不同。
hash模式的实现原理是通过监听hashChange事件来实现的，前端js把当前hash地址对应的组件渲染到浏览器中。history模式是通过调用 history.pushState方法(或者replaceState) 并且 监听popstate事件来实现的。
2.表现不同。
hash模式会在地址栏中有#号，而history模式没有；同时由于history模式的实现原理用到H5的新特性，所以它对浏览器的兼容性有要求(IE >= 10)。

3.history模式特点
history模式开发的SPA项目，需要服务器端做额外的配置，否则会出现刷新白屏（链接分享失效）。原因是页面刷新时，浏览器会向服务器真的发出对这个地址的请求，而这个文件资源又不存在，所以就报404。处理方式就由后端做一个保底映射:所有的请求全部拦截到index.html上。

