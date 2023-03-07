# 1. any unknown never void 的区别

1.any,即可以赋任何类型（never 除外）的值 2.和 any 一样，任何类型都可以赋值给 unknown 类型的对象
3.never 类型只接受 never 类型的对象，我们想表示某个函数永远不会返回时，可以使用 never 类型 4.其实可以理解为 null 和 undefined 的联合类型，它表示空值
==>说明一下 void 和 never 的区别。void 表示空值，也就是 null 或者 undefined，而 never 则表示永远都不会出现的值
