### 1.js 中改变原数组的方法 不改变原始数组的方法：

         改变：pop，push,shift,unshift,reverse,sort,splice,
        不改变：concat,join,slice,map,some,every,filter

### 2.JS 的数据类型你了解多少？

### 3.如何实现一个深浅拷贝？

### 4 执行空间和作用域的区别

### 5 箭头函数与普通函数的区别？

1.箭头函数的 this 指向定义时上层作用域中的 this,（写出时确定）普通函数 this 指向调用者（运行时确定） 2.箭头函数的 this 永远不会变，call、apply、bind 也无法改变 3.箭头函数没有原型 prototype 4.箭头函数不能当成一个构造函数

### 6 探究 JS 常见的 6 种继承方式

<!-- https://github.com/mqyqingfeng/Blog/issues/16 -->

原型链继承，借用构造函数继承（经典继承），组合式继承，es6 的 exstend 继承
原型式继承，寄生式继承 寄生组合式继承

### 7 继承进阶：如何实现 new、apply、call、bind 的底层逻辑？

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

### 8 toString 和 valueOf
   所有的引用类型都有 toString 和 valueOf 方法，toString 返回一个字符串，valueOf 返回一个原始类型的值
     toString将一个引用类型的值转换成字符串的形式
     valueOf  返回最适合的引用类型的原始值

```js
// 当该引用类型既有tostring()方法又有valueOf()方法时，
/*  场景1:要将引用类型转成string类型：
          会先经过toString(),将得到的原始类型转成字符串展示，若还不能得到想要的原始类型值,会再经过valueOf，若还是不能得到想要的原始类型值，最后会抛错会
        
    场景2:要将引用类型转成Number类型：
          会先经过valueOf,将得到的原始类型转成数值展示,若还不能得到想要的原始类型值，会再经过 toString()，若还是不能得到想要的原始类型值，最后会抛错会
        
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

### 9 js 模块化

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



### *必背==>let var const 的区别

在 JavaScript 中，`let`、`var` 和 `const` 是用于声明变量的关键字，它们有以下区别：

1. **作用域**：
   - `var`：使用 `var` 声明的变量具有函数作用域，即在声明它的函数内部可见。如果在函数内部使用 `var` 声明的变量，在函数外部也可以访问到它（存在变量提升）。
   - `let` 和 `const`：使用 `let` 或 `const` 声明的变量具有块级作用域，即在声明它的块（例如，if 语句、for 循环等）内可见。它们不会存在变量提升，只能在声明之后才能访问到。

2. **变量提升**：
   - `var`：使用 `var` 声明的变量会进行变量提升，即在作用域的顶部被声明，但初始化的值为 `undefined`。这意味着可以在声明之前访问变量。
   - `let` 和 `const`：使用 `let` 或 `const` 声明的变量不会进行变量提升。在声明之前访问变量会导致引发 `ReferenceError` 错误。

3. **重复声明**：
   - `var`：允许重复声明同一个变量，而不会引发错误。这可能会导致变量被意外覆盖。
   - `let` 和 `const`：不允许在同一个作用域中重复声明同一个变量。如果尝试重复声明，会引发 `SyntaxError` 错误。

4. **可变性**：
   - `var` 和 `let`：声明的变量可以重新赋值。
   - `const`：声明的变量是常量，一旦赋值就不能再修改。尝试修改 `const` 声明的变量会引发 `TypeError` 错误。

5. **暂时性死区**：
   - `let` 和 `const`：在块级作用域中，使用 `let` 或 `const` 声明的变量会创建一个暂时性死区（Temporal Dead Zone，TDZ），在该区域内访问变量会引发 `ReferenceError` 错误。直到变量声明被执行，才能安全地访问变量。

一般来说，推荐使用 `let` 和 `const` 来声明变量，因为它们提供了更严格的作用域和错误检查，可以减少潜在的问题。只有在特定情况下，需要在函数作用域中使用变量提升时，才使用 `var`。而 `const` 则适用于声明不需要重新赋值的常量。


### 浏览器的渲染原理
浏览器的渲染原理可以被简化为以下几个步骤：

1. **解析 HTML**：浏览器首先将接收到的 HTML 文档进行解析，构建一个 DOM（文档对象模型）树的结构。DOM 树表示了 HTML 文档的层次结构，包含了页面上的各个元素及其关系。

2. **解析 CSS**：浏览器解析 CSS 样式表，构建 CSSOM（CSS 对象模型）树。CSSOM 树表示了样式规则的层次结构，包含了页面上的各个元素及其对应的样式规则。

3. **合并 DOM 和 CSSOM**：浏览器将 DOM 树和 CSSOM 树进行合并，生成一个渲染树（Render Tree）。渲染树只包含需要显示的元素和其对应的样式规则，隐藏的元素不会包含在渲染树中。

4. **布局（Layout）**：渲染树中的每个节点都包含了元素的几何信息，浏览器使用这些几何信息计算每个元素在页面中的位置和大小。这个过程被称为布局或重排（Reflow）。

5. **绘制（Painting）**：根据布局阶段计算得到的元素位置和大小，浏览器将渲染树中的每个元素绘制到页面的对应位置上。这个过程通常被称为绘制或重绘（Repaint）。

6. **合成（Composition）**：如果页面中有多个图层（例如使用 CSS 属性 `transform` 或 `opacity` 创建的图层），浏览器将合并这些图层，最终将它们合成为一个可显示的图像。

7. **显示（Display）**：最后一步是将绘制完成的图像显示在用户的屏幕上，完成整个渲染过程。

需要注意的是，渲染过程是逐步执行的，并且与 JavaScript 的执行是交替进行的。当浏览器遇到 JavaScript 代码时，渲染过程会暂停，执行 JavaScript 代码，然后再继续渲染。

优化浏览器渲染性能的关键是减少布局和绘制的次数，因为这些步骤是相对较昂贵的操作。可以通过以下方法来进行优化：

- 减少 DOM 操作和样式改变的次数，尽量使用批量操作，以减少布局和绘制的次数。
- 使用 CSS3 动画和过渡，它们可以利用硬件加速，并且比使用 JavaScript 实现动画效果更高效。
- 避免在布局流程中频繁地读取元素的布局信息（例如，offsetWidth、offsetHeight），因为这会触发强制同步布局。
- 使用 CSS 属性 `transform` 和 `opacity` 创建图层，可以将复杂的元素分离到单独的图层中，减少重绘和重排的影响范围。
- 避免使用表格布局（Table Layout），因为表格布局在每个单元格的内容发生变化时会触发整个表格的重新布局。

以上是浏览器的基本渲染原理和一些优化方法的简要介绍。实际上，浏览器的渲染过程非常复杂，涉及到更多的细节和优化技巧。了解这些原理可以帮助开发者更好地理解和优化网页性能。


### 未定义(undefined)，未声明(undeclared)
在 JavaScript 中，有两种类型的错误与变量相关：未定义（undefined）和未声明（undeclared）。

1. 未定义（undefined）：当访问一个已声明但未赋值的变量时，该变量的值为 `undefined`。这表示变量存在，但没有被赋予任何值。

```javascript
var x;
console.log(x); // 输出: undefined
```

在上述示例中，变量 `x` 被声明了，但没有被赋值，因此它的值为 `undefined`。

2. 未声明（undeclared）：当使用一个没有经过声明的变量时，会抛出一个引用错误（ReferenceError），表示该变量未定义。

```javascript
console.log(y); // Uncaught ReferenceError:: y is not defined
```

在上述示例中，变量 `y` 没有经过声明，因此在访问时会抛出一个引用错误。

需要注意的是，使用 `var`、`let` 或 `const` 关键字声明的变量都会被视为已声明的变量。只有在没有使用任何声明关键字的情况下，才会出现未声明的变量错误。
注意let const 声明的变量暂时性死区也会这样报 Uncaught ReferenceError   未经声明的变量不可使用

总结来说：

- 未定义（undefined）是指已声明但未赋值的变量，其值为 `undefined`。
- 未声明（undeclared）是指未经过声明的变量，访问时会抛出引用错误。

在编写 JavaScript 代码时，建议始终声明变量，避免出现未声明的变量错误，并在使用变量之前给它们赋予初值，以避免出现未定义的变量。
