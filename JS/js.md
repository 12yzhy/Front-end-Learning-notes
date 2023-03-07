### 1.js 中改变原数组的方法 不改变原始数组的方法：

         改变：pop，push,shift,unshift,reverse,sort,splice,
        不改变：concat,join,slice,map,some,every,filter

### 2.JS 的数据类型你了解多少？

### 3.如何实现一个深浅拷贝？

### 4 执行空间和作用域的区别

### 箭头函数与普通函数的区别？

1.箭头函数的 this 指向定义时上层作用域中的 this,（写出时确定）普通函数 this 指向调用者（运行时确定） 2.箭头函数的 this 永远不会变，call、apply、bind 也无法改变 3.箭头函数没有原型 prototype 4.箭头函数不能当成一个构造函数

### 探究 JS 常见的 6 种继承方式

<!-- https://github.com/mqyqingfeng/Blog/issues/16 -->

原型链继承，借用构造函数继承（经典继承），组合式继承，es6 的 exstend 继承
原型式继承，寄生式继承 寄生组合式继承

### 5 继承进阶：如何实现 new、apply、call、bind 的底层逻辑？

00:54:19 05 函数那些事：JS 闭包难点剖析
01:05:49 06 进阶练习：带你一起实现 JSON.Stringify 方法
01:12:21 07 数组原理(上)：帮你梳理眼花缭乱的数组 API
01:24:23 08 数组原理(中)：如何理解 JS 的类数组？
01:32:18 09 数组原理(下)：实现数组扁平化的 6 种方式
01:38:27 10 数组排序(上)：如何用 JS 实现各种数组排序？
01:46:38 11 数组排序(下)：ort 排序方法的实现原理
01:53:57 12 进阶练习：带你手写 JS 数组多个方法的底层实现
01:58:09 13 异步编程(上)：JS 异步编程都有哪些方案？
02:04:53 14 异步编程(中)：如何深入理解异步编程的核心 Promie？
02:13:26 15 异步编程(下)：如何理解 Generator、Ayncawait 等异步编程的语法糖？
02:22:23 16 进阶练习(上)：怎样轻松实现一个 EventEmitter？
02:29:33 17 进阶练习(下)：如何实现符合 PromieA+ 规范的 Promie？
02:37:33 18 垃圾回收：释放内存，提升浏览器页面性能
02:47:25 19 事件轮询：如何理解浏览器中的 EventLoop？
02:57:04 20 原理解析：JS 代码是如何被浏览器引擎编译、执行的？
03:05:13 21 引擎进阶(上)：探究宏任务 & 微任务的运行机制
03:14:07 22 引擎进阶(下)：如何理解 Proce.nextTick 的原理？

### toString 和 valueOf

     toString将一个引用类型的值转换成字符串的形式
     valueOf  返回最适合的引用类型的原始值

```js
/*  场景1要将引用类型转成string类型
                会先经过toString(),若还不能得到想要的原始类型值，会再经过valueOf，若还是不能得到想要的原始类型值，最后会抛错会
        
        */
/*  场景2要将引用类型转成Number类型
                会先经过valueOf,若还不能得到想要的原始类型值，会再经过 toString()，若还是不能得到想要的原始类型值，最后会抛错会
        
        */
//测试题
let obj =
  {
    a: 10,
    toString: function () {
      console.log("执行了toString");
      return this.a;
    },
    valueOf: function () {
      console.log("执行了valueOf");
      return this.a;
    },
  } +
  //  下面打印了什么
  obj; //执行了valueOf
"" + obj; //执行了valueOf
obj == "10"; //执行了valueOf
```

### js 模块化

        参考 https://github.com/buppt/Video-article-blog/issues/1
        常见的是

commonjs cjs,
esm,esmoudle
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
运行时加载，es6 编译时输出

但是浏览器同步读取服务器端的模块可能需要很长的时间，浏览器将会处于”假死”状态。所以出现异步加载 js 文件的 AMD。
amd==>异步模块加载(加载服务器上资源)
异步模块定义（Asynchronous Module Definition）。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

```js
// //utils.js
define([], function () {
  return {
    add: function (a, b) {
      console.log(a + b);
    },
  };
});
// main.js 文件
require(["./utils"], function (utils) {
  utils.add(1, 2);
});
```

不同于 AMD 的依赖前置，CMD 是就近依赖

```js
// AMD
require(["./utils", "a", "b"], function (utils) {
  console.log(1);
  // 还没有用到 utils a b 等模块，但是 AMD 已经初始化了所有模块
  console.log(2);
  utils.add(1, 2);
});

//CMD
define(function (require, exports, module) {
  console.log(1);
  if (false) {
    var utils = require("./utils"); // 需要时再 require，不执行就不会加载
    utils.add(1, 2);
  }
});
```

再说 UMD，通用模块定义（Universal Module Definition），比如你写了一段代码或者写了一个库，在服务器端和浏览器端都会用到，难道要维护 CJS 和 AMD 两套代码吗，这时候，UMD 就来了，它其实就是帮你判断应该用 AMD 还是 commonJS，是哪个就用哪个方式来定义模块，都不是的话就挂到全局对象上。

```js
// utils.js 文件同上
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    //AMD
    define(["utils"], factory);
  } else if (typeof exports === "object") {
    //CommonJS
    var utils = require("utils");
    module.exports = factory(utils);
  } else {
    root.result = factory(root.utils);
  }
})(this, function (utils) {
  utils.add(1, 2);
});
```
